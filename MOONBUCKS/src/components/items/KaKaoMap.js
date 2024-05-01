import { useEffect, useState } from 'react';
const { kakao } = window;

function KaKaoMap( { shop } ){

    /* 카카오 지도 api 사용하여 매장 위치 지도에 표시 */
    
    const [map, setMap] = useState(null);   
    const [marker, setMarker] = useState(null);
    const xcoord = shop.shopXcoordinate;
    const ycoord = shop.shopYcoordinate;

    
    useEffect(
        () => {
            const container = document.getElementById('kakaomap');
            if(container){
                const options = {
                    center: new kakao.maps.LatLng(ycoord, xcoord),
                    level: 3
                };

                const map = new kakao.maps.Map(container, options);
                map.setDraggable(false);
                map.setZoomable(false);
                /* custom marker */
                const imageSrc = '../../../MoonbucksMaker.png'; // 마커이미지의 주소입니다    
                const imageSize = new kakao.maps.Size(35.4297, 50); // 마커이미지의 크기입니다
                const imageOption = {offset: new kakao.maps.Point(27, 50)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                      markerPosition = new kakao.maps.LatLng(ycoord, xcoord); // 마커가 표시될 위치입니다
                const marker = new kakao.maps.Marker({position: markerPosition, image: markerImage});
                marker.setMap(map);
                
                setMap(map);
                setMarker(marker);

                
            }

            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        },
        []
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
            <div id="kakaomap"></div> 
    )


}

export default KaKaoMap;