
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetShoplistAPI, callRegistShopAPI } from '../../apis/ShopAPICalls';
import KaKaoMapFind from '../items/KaKaoMapFind';
import Swal from "sweetalert2";


function ShopRegistForm() {

	const result = useSelector(state => state.shopReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const shopList = result.shoplist;
	const nameCaution = document.getElementById('nameCaution');

	useEffect(
		() => {
				const shopNameValue = document.getElementById('shopName').value;
				const nameCaution = document.getElementById('nameCaution');
		
				
				if(shopNameValue.trim() === ''){
					nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
					nameCaution.style = 'color : rgb(247, 51, 51)';
				} 
				
		},[]
	)

	useEffect(
		() => {
			setRegistShop({
				id: 0,
				shopName: '',
				shopAddr: '서울특별시 서대문구 연세로 10-1',
				shopPhone: '',
				shopCategory: '',
				shopYcoordinate: 37.556514,
				shopXcoordinate: 126.936992
			});
		},[]
	)



	/* 입력 값 state 저장 */
	const [registShop, setRegistShop] = useState(
		{
			id: 0,
			shopName: '',
			shopAddr: '서울특별시 서대문구 연세로 10-1',
			shopPhone: '',
			shopCategory: '',
			shopYcoordinate: 37.556514,
			shopXcoordinate: 126.936992
		}
	);

	const handleCoordinateChange = (xcoord, ycoord, shopAddress) => {
        setRegistShop({
            ...registShop,
            shopXcoordinate: xcoord,
            shopYcoordinate: ycoord,
			shopAddr:shopAddress
        });
    }

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		// console.log('name : ', name);
		// console.log('value : ', value);

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'shopYcoordinate':
				value = parseInt(value);
				break;
			case 'shopXcoordinate':
				value = parseInt(value);
				break;
		}

		if(shopList){
			const shopNameValue = document.getElementById('shopName').value;
			const nameCaution = document.getElementById('nameCaution');
			let isDuplicateName = shopList.some(shop => shop.shopName === shopNameValue);

			console.log('shopNameValue : ', shopNameValue);

			if(shopNameValue.trim() === ''){
				nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else if(isDuplicateName){
				nameCaution.innerHTML = '  * 중복된 매장명입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else{
				nameCaution.innerHTML = '  * 사용가능한 매장명입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
			}
		}
		

		setRegistShop(
			{
				...registShop,
				[name]: value
			}
		);

		console.log(registShop);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setRegistShop(
			{
				...registShop,
				detail: {
					description: registShop.detail.description,
					image: base64
				}
			}
		);

		console.log(registShop);
	}

	/* FileReader API를 통해 input type="file"에 첨부 된 파일을 base64 인코딩 형식으로 변환 */
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result);
			}
			fileReader.onerror = (error) => {
				reject(error);
			}
		})
	}


	useEffect(
		() => {
			/* 매장 등록 완료 확인 후 /shop로 이동 */
			if (result.regist) {
				Swal.fire({
					icon: "success",
					title: `매장이 등록되었습니다`,
					showConfirmButton: false,
					timer: 1000
				});
				navigate(`/shop`);
			}
		},
		[result]
	);

	useEffect(
		() => {
			
		},
		[registShop]
	)

	useEffect(
	() => {
			dispatch(callGetShoplistAPI('전체보기'));
			if(shopList && shopList.length > 0) {

				let maxId = shopList.reduce((max, shop) => {
					const parsedId = parseInt(shop.id, 10);
					return Math.max(max, isNaN(parsedId) ? 0 : parsedId);
				},0);

				let nextId = maxId + 1;

				console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

				setRegistShop(
					{
						...registShop,
						id: `${nextId}`
					}
				);
			}
		},
		[]
	)

	// useEffect(
	// 	() => {
	// 		dispatch(callGetShopAPI());
	// 	}
	// )

	// useEffect(
	// 	() => {

	// 		if(shopList && shopList.length > 0) {

	// 			let maxId = shopList.reduce((max, shop) => Math.max(max, shop.id, 0));
	// 			let nextId = maxId + 1;

	// 			console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

	// 			setRegistShop(
	// 				{
	// 					...registShop,
	// 					id: `${nextId}`
	// 				}
	// 			);
	// 		}
	// 	}
	// )

	const onClickHandler = () => {
		/* registShop에 대한 유효성 검사 후 호출 */
		if(nameCaution){
			if(nameCaution.innerHTML == '  * 사용가능한 매장명입니다.'){
				dispatch(callRegistShopAPI(registShop));
			}else if(nameCaution.innerHTML == '  * 중복된 매장명입니다.'){
				Swal.fire({
					icon: "warning",
					html: `중복된 매장명입니다. 다시 입력해주세요`,
					showCancelButton: false,
					confirmButtonColor: "#1A264B",
					confirmButtonText: "확인",
				});
				document.getElementById('shopName').focus();
			}else{
				Swal.fire({
					icon: "warning",
					html: `매장명은 반드시 작성해야 합니다.`,
					showCancelButton: false,
					confirmButtonColor: "#1A264B",
					confirmButtonText: "확인",
				});
				document.getElementById('shopName').focus();
			}
		}
	}

	return (
		<div className='formTotal'>
			<label>매장 이름 </label><span id="nameCaution" className='nameCaution'></span>
			<input type="text" name="shopName" id="shopName" value={registShop.shopName} onChange={onChangeHandler} />
			<br />
			<label>매장 주소 </label>
			<input type="text" name="shopAddr" id="shopAddr" value={registShop.shopAddr} onChange={onChangeHandler} />
			<br />
			<label>매장 연락처 </label>
			<input type="text" name="shopPhone" id="shopPhone" value={registShop.shopPhone} onChange={onChangeHandler} />
			<br />
			<label>카테고리 </label><br/>
			<select name="shopCategory" value={registShop.shopCategory} onChange={onChangeHandler}>
				<option>일반 매장</option>
				<option>DT 매장</option>
				<option>리저브 매장</option>
			</select>
			<br />
			<label>매장 x좌표 </label>
			<input type="text" name="shopXcoordinate" value={registShop.shopXcoordinate} onChange={onChangeHandler} />
			<br />
			<label>매장 y좌표 </label>
			<input type="text" name="shopYcoordinate" value={registShop.shopYcoordinate} onChange={onChangeHandler} />
			<br />
			<KaKaoMapFind onCoordinateChange={handleCoordinateChange} shop={registShop}/>
			<button onClick={onClickHandler}>매장 등록</button>
			
		</div>
	);
}

export default ShopRegistForm;