import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callModifyShopAPI } from '../../apis/ShopAPICalls';
import { callGetShopAPI } from '../../apis/ShopAPICalls';
import KaKaoMapFind from '../items/KaKaoMapFind';
import Swal from "sweetalert2";


function ShopModifyForm() {

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.shopReducer);
	const shop = result.shop;

	
	
	console.log('[ShopModifyForm] result', result);
	
	
	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* shop 호출 API */
			dispatch(callGetShopAPI(id));
		},
		[]
	);

	
	/* 입력 값 state 저장 */
	const [modifyShop, setModifyShop] = useState(
		{
			id: id,
			shopName: '',
			shopAddr: '',
			shopPhone: '',
			shopCategory: '',
			shopYcoordinate: '',
			shopXcoordinate: '',
		}
	);

	const handleCoordinateChange = (xcoord, ycoord, shopAddress) => {
        setModifyShop({
            ...modifyShop,
            shopXcoordinate: xcoord,
            shopYcoordinate: ycoord,
			shopAddr:shopAddress
        });
    }

	useEffect(
		()=> {
			if(shop){
				setModifyShop(
					{
						...shop,
						shopName: shop.shopName,
						shopAddr: shop.shopAddr,
						shopPhone: shop.shopPhone,
						shopCategory: shop.shopCategory,
						shopYcoordinate: shop.shopYcoordinate,
						shopXcoordinate: shop.shopXcoordinate
					}
				)
	
			}
		},
		[shop]
	)

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'shopYcoordinate':
				value = parseInt(value);
				break;
			case 'shopXcoordinate':
				value = parseInt(value);
				break;
		}


		setModifyShop(
			{
				...modifyShop,
				id: id,
				[name]: value
			}
		);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setModifyShop(
			{
				...modifyShop,
				detail: {
					description: modifyShop.detail.description,
					image: base64
				}
			}
		);
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

			/* 메뉴 수정 완료 확인 후 /shop로 이동 */
			console.log('result 바뀔때마다 호출...', result);
			
			if (result.modify) {
				Swal.fire({
					icon: "success",
					title: `매장이 수정되었습니다`,
					showConfirmButton: false,
					timer: 1000
				});
				navigate(`/shop`);
			}
		},
		[result]
	);

	const onClickHandler = () => {
		/* modifyShop에 대한 유효성 검사 후 호출 */
		dispatch(callModifyShopAPI(modifyShop));
	}

	return (
		<div className='formTotal'>
			<h1>{id}번 매장 수정</h1>
			<label>매장 이름 </label><br/>
			<input type="text" name="shopName" value={modifyShop.shopName} onChange={onChangeHandler} />
			<br />
			<label>매장 주소 </label><br/>
			<input type="text" name="shopAddr" value={modifyShop.shopAddr} onChange={onChangeHandler} />
			<br />
			<label>매장 연락처 </label><br/>
			<input type="text" name="shopPhone" value={modifyShop.shopPhone} onChange={onChangeHandler} />
			<br />
			<label>카테고리 </label><br/>
			<select name="shopCategory" value={modifyShop.shopCategory} onChange={onChangeHandler}>
				<option>일반</option>
				<option>DT</option>
				<option>리저브</option>
			</select>
			<br />
			<label>매장 x좌표 </label><br/>
			<input type="text" name="shopXcoordinate" readOnly={true} value={modifyShop.shopXcoordinate} onChange={onChangeHandler} />
			<br />
			<label>매장 y좌표 </label><br/>
			<input type="text" name="shopYcoordinate" readOnly={true} value={modifyShop.shopYcoordinate} onChange={onChangeHandler} />
			<br />
			<KaKaoMapFind onCoordinateChange={handleCoordinateChange} shop={modifyShop}/>
			<button onClick={onClickHandler}>매장 수정</button>
		</div>
	)
}

export default ShopModifyForm;