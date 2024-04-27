
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetDessertAPI, callRegistDessertAPI } from '../../apis/DessertAPICalls';


function DessertRegistForm() {

	const result = useSelector(state => state.dessertReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dessertList = result.dessertlist;
	

	/* 입력 값 state 저장 */
	const [registDessert, setRegistDessert] = useState(
		{
			id: 0,
			menuName: '',
			menuPrice: 0,
			categoryName: '브레드',
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
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: registDessert.detail.image
				};
				break;
		}


		setRegistDessert(
			{
				...registDessert,
				id: `${dessertList.length+1}`,
				[name]: value
			}
		);

		console.log(registDessert);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setRegistDessert(
			{
				...registDessert,
				detail: {
					description: registDessert.detail.description,
					image: base64
				}
			}
		);

		console.log(registDessert);
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
				navigate(`/dessert`);
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
		dispatch(callRegistDessertAPI(registDessert));
	}

	return (
		<>
			<label>메뉴 이름 : </label>
			<input type="text" name="menuName" value={registDessert.menuName} onChange={onChangeHandler} />
			<br />
			<label>메뉴 가격 : </label>
			<input type="number" name="menuPrice" value={registDessert.menuPrice} onChange={onChangeHandler} />
			<br />
			<label>카테고리 : </label>
			<select name="categoryName" value={registDessert.categoryName} onChange={onChangeHandler}>
				<option>브레드</option>
				<option>케이크</option>
				<option>샌드위치</option>
			</select>
			<br />
			<label>설명 : </label>
			<textarea name="description" value={registDessert.detail.description} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진 : </label>
			<input
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler} />
			<br />
			<button onClick={onClickHandler}>메뉴 등록</button>
		</>
	);
}

export default DessertRegistForm;