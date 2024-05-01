import { useEffect, useState } from 'react';
const { kakao } = window;

function KaKaoMapFind( { onCoordinateChange, shop } ){

    const { shopXcoordinate, shopYcoordinate, shopAddr } = shop;
    const [newXcoord, setNewXCoord] = useState();
    const [newYcoord, setNewYCoord] = useState();
    const [newAddr, setNewAddr] = useState();
    const [map, setMap] = useState(null);   
    const [marker, setMarker] = useState(null);
    const [infoContent, setInfoContent] = useState();

    /* 카카오 지도 api 사용하여 매장 위치 지도에 표시 */
    const handleCoordinateChange = (shopXcoordinate, shopYcoordinate, shopAddr) => {
        onCoordinateChange(shopXcoordinate, shopYcoordinate, shopAddr);
    }

    useEffect(
        () => {
            // 좌표를 변경할 때마다 호출
            handleCoordinateChange(newXcoord, newYcoord, newAddr);
        }, 
        [newXcoord, newYcoord, newAddr]
    );

    
    useEffect(
        () => {
            const container = document.getElementById('map');
            if(container){
                const options = {
                    center: new kakao.maps.LatLng(shopYcoordinate, shopXcoordinate),
                    level: 3
                };

                const map = new kakao.maps.Map(container, options);

                const infowindow = new kakao.maps.InfoWindow({zindex:1});

                // 주소-좌표 변환 객체를 생성합니다
                const geocoder = new kakao.maps.services.Geocoder();

                /* custom marker */
                const imageSrc = '../../../MoonbucksMaker.png'; // 마커이미지의 주소입니다    
                const imageSize = new kakao.maps.Size(35.4297, 50); // 마커이미지의 크기입니다
                const imageOption = {offset: new kakao.maps.Point(27, 50)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                      markerPosition = new kakao.maps.LatLng(shopYcoordinate, shopXcoordinate); // 마커가 표시될 위치입니다
                const marker = new kakao.maps.Marker({position: markerPosition, image: markerImage});
                marker.setMap(map);

                if(infoContent){
                    infowindow.setContent(infoContent);
                    infowindow.open(map, marker);
                }
                
                kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    setNewXCoord(mouseEvent.latLng.getLng());
                    setNewYCoord(mouseEvent.latLng.getLat());

                    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                            
                            var content = '<div class="bAddr">' +
                                            '<span class="title">법정동 주소정보</span>' + 
                                            detailAddr + 
                                        '</div>';
                
                            setInfoContent(content);
                            setNewAddr(result[0].road_address.address_name);
                                        
                            // 마커를 클릭한 위치에 표시합니다 
                            marker.setPosition(mouseEvent.latLng);
                            marker.setMap(map);
                
                            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        }   
                    });
                });
                
                // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
                kakao.maps.event.addListener(map, 'idle', function() {
                    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
                });
                
                const searchAddrFromCoords = (coords, callback)=> {
                    // 좌표로 행정동 주소 정보를 요청합니다
                    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
                }
                
                const searchDetailAddrFromCoords = (coords, callback) => {
                    // 좌표로 법정동 상세 주소 정보를 요청합니다
                    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
                
                }
                
                // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
                const displayCenterInfo = (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        var infoDiv = document.getElementById('centerAddr');
                
                        for(var i = 0; i < result.length; i++) {
                            // 행정동의 region_type 값은 'H' 이므로
                            if (result[i].region_type === 'H') {
                                infoDiv.innerHTML = result[i].address_name;
                                break;
                            }
                        }
                    }    
                }

                setMap(map);
                setMarker(marker);

            }

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        
        },
        [shop]
    )

    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', handleWindowResize);

        // Clean up function to remove event listener
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [map, marker]);

    const handleWindowResize = () => {
        if (map && marker) {
            // Get center of the map
            const center = map.getCenter();
            // Set marker position to the center of the map
            marker.setPosition(center);
        }
    };


    return(
        <div className="map_wrap">
            <div id="map"></div>
            <div className="hAddr">
                <span className="title">지도중심기준 행정동 주소정보</span>
                <span id="centerAddr"></span>
            </div> 
        </div>
    )


}

export default KaKaoMapFind;