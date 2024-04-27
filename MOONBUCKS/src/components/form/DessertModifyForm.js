import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callModifyDessertAPI } from '../../apis/DessertAPICalls';
import { callGetDessertAPI } from '../../apis/DessertAPICalls';

function DessertModifyForm() {

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.dessertReducer);
	const dessert = result.dessert;

	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* menu 호출 API */
			dispatch(callGetDessertAPI(id));
		},
		[]
	);

	/* 입력 값 state 저장 */
	const [modifyDessert, setModifyDessert] = useState(
		{
			id: id,
			menuName: dessert.menuName,
			menuPrice: dessert.menuPrice,
			categoryName: '브레드',
			detail: {
				description: dessert.detail.description,
				image: dessert.detail.image
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
					image: modifyDessert.detail.image
				};
				break;
		}

		setModifyDessert(
			{
				...modifyDessert,
				id: id,
				[name]: value
			}
		);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setModifyDessert(
			{
				...modifyDessert,
				detail: {
					description: modifyDessert.detail.description,
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
			/* 메뉴 수정 완료 확인 후 /menu로 이동 */
			if (result.modify) {
				alert('메뉴 수정');
				navigate(`/dessert`);
			}
		},
		[result]
	);

	const onClickHandler = () => {
		/* modifyDessert에 대한 유효성 검사 후 호출 */
		dispatch(callModifyDessertAPI(modifyDessert));
	}

	return (
		<>
			<h1>{id}번 메뉴 수정</h1>
			<label>메뉴 이름 : </label>
			<input type="text" name="menuName" value={modifyDessert.menuName} onChange={onChangeHandler} />
			<br />
			<label>메뉴 가격 : </label>
			<input type="number" name="menuPrice" value={modifyDessert.menuPrice} onChange={onChangeHandler} />
			<br />
			<label>카테고리 : </label>
			<select name="categoryName" value={modifyDessert.categoryName} onChange={onChangeHandler}>
				<option>브레드</option>
				<option>케이크</option>
				<option>샌드위치</option>
			</select>
			<br />
			<label>설명 : </label>
			<textarea name="description" value={modifyDessert.detail.description} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진 : </label>
			<input
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler}
			/>
			<br />
			<button onClick={onClickHandler}>메뉴 수정</button>
		</>
	)
}

export default DessertModifyForm;