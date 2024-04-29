
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetMenuAPI, callRegistMenuAPI } from '../../apis/MenuAPICalls';


function MenuRegistForm() {

	const result = useSelector(state => state.menuReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const menuList = result.menulist;
	

	/* 입력 값 state 저장 */
	const [registMenu, setRegistMenu] = useState(
		{
			id: 0,
			menuName: '',
			menuPrice: 0,
			categoryName: '한식',
			isOrderable: false,
			detail: {
				description: '',
				image: ''
			}
		}
	);

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'menuPrice':
				value = parseInt(value);
				break;
			case 'isOrderable':
				value = !!value;
				break;
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: registMenu.detail.image
				};
				break;
		}


		setRegistMenu(
			{
				...registMenu,
				id: `${menuList.length+1}`,
				[name]: value
			}
		);

		console.log(registMenu);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setRegistMenu(
			{
				...registMenu,
				detail: {
					description: registMenu.detail.description,
					image: base64
				}
			}
		);

		console.log(registMenu);
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
			/* 메뉴 등록 완료 확인 후 /menu로 이동 */
			if (result.regist) {
				alert('메뉴 등록');
				navigate(`/menu`);
			}
		},
		[result]
	);


	// useEffect(
	// 	() => {
	// 		dispatch(callGetMenuAPI());
	// 	}
	// )

	// useEffect(
	// 	() => {

	// 		if(menuList && menuList.length > 0) {

	// 			let maxId = menuList.reduce((max, menu) => Math.max(max, menu.id, 0));
	// 			let nextId = maxId + 1;

	// 			console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

	// 			setRegistMenu(
	// 				{
	// 					...registMenu,
	// 					id: `${nextId}`
	// 				}
	// 			);
	// 		}
	// 	}
	// )

	const onClickHandler = () => {
		/* registMenu에 대한 유효성 검사 후 호출 */
		dispatch(callRegistMenuAPI(registMenu));
	}

	return (
		<>
			<div className='formTotal'>
				<label>매장 이름 </label>
				<input type="text" name="shopName" value={registShop.shopName} onChange={onChangeHandler} />
				<br />
				<label>매장 주소 </label>
				<input type="text" name="shopAddr" value={registShop.shopAddr} onChange={onChangeHandler} />
				<br />
				<label>매장 연락처 </label>
				<input type="text" name="shopPhone" value={registShop.shopPhone} onChange={onChangeHandler} />
				<br />
				<label>카테고리 </label><br/>
				<select name="shopCategory" value={registShop.shopCategory} onChange={onChangeHandler}>
					<option>일반</option>
					<option>DT</option>
					<option>리저브</option>
				</select>
				<br />
				<label>매장 x좌표 </label>
				<input type="text" name="shopXcoordinate" value={registShop.shopXcoordinate} onChange={onChangeHandler} />
				<br />
				<label>매장 y좌표 </label>
				<input type="text" name="shopYcoordinate" value={registShop.shopYcoordinate} onChange={onChangeHandler} />
				<br />
				<button onClick={onClickHandler}>매장 등록</button>
				
			</div>
		</>
	);
}

export default MenuRegistForm;