import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callModifyCoffeeAPI } from '../../apis/CoffeeAPICalls';
import { callGetCoffeeAPI } from '../../apis/CoffeeAPICalls';

function CoffeeModifyForm() {

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.coffeeReducer);
	const coffee = result.coffee;

	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* coffee 호출 API */
			dispatch(callGetCoffeeAPI(id));
		},
		[]
	);

	/* 입력 값 state 저장 */
	const [modifyCoffee, setModifyCoffee] = useState(
		{
			id: id,
			coffeeName: '',
			coffeePrice: 0,
			categoryName: '',
			detail: {
				description: '',
				image: ''
			}
		}
	);

	useEffect(
		() => {

			if(coffee){
				setModifyCoffee(
										{
						id: id,
						coffeeName: coffee.coffeeName,
						coffeePrice: coffee.coffeePrice,
						categoryName: coffee.categoryName,
						detail: {
							description: coffee.detail.description,
							image: coffee.detail.image
						}
					}					
				)
			}
		},
		[coffee]
	)


	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'coffeePrice':
				value = parseInt(value);
				break;
			case 'isOrderable':
				value = !!value;
				break;
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: modifyCoffee.detail.image
				};
				break;
		}

		setModifyCoffee(
			{
				...modifyCoffee,
				id: id,
				[name]: value
			}
		);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setModifyCoffee(
			{
				...modifyCoffee,
				detail: {
					description: modifyCoffee.detail.description,
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
			/* 메뉴 수정 완료 확인 후 /coffee로 이동 */
			console.log('result 바뀔때마다 호출...', result);

			if (result.modify) {
				alert('메뉴 수정');
				navigate(`/coffee`);
			}
		},
		[result]
	);

	const onClickHandler = () => {
		/* modifyCoffee에 대한 유효성 검사 후 호출 */
		dispatch(callModifyCoffeeAPI(modifyCoffee));
	}

	return (
		<div className='formTotal'>
			<h1>{id}번 메뉴 수정</h1>
			<label>이름</label>
			<input type="text" name="coffeeName" value={modifyCoffee.coffeeName} onChange={onChangeHandler} />
			<br />
			<label>가격</label>
			<input type="number" name="coffeePrice" value={modifyCoffee.coffeePrice} onChange={onChangeHandler} />
			<br />
			<label>카테고리</label><br/>
			<select name="categoryName" value={modifyCoffee.categoryName} onChange={onChangeHandler}>
				<option>커피</option>
				<option>차</option>
				<option>블렌디드</option>
			</select>
			<br />
			<label>설명</label><br/>
			<textarea name="description" value={modifyCoffee.detail.description} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진</label><br/>
			{modifyCoffee.detail.image && (
				<div className='imgBox'>
					<span>
						<img className='imgUpload' src={modifyCoffee.detail.image} alt="이전 이미지" />

					</span>
					<br />
				</div>
			)}
			<input
				id="input-file"
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler}
				// style={{display:"none"}}
			/>
			<br />
			<button onClick={onClickHandler}>메뉴 수정</button>
		</div>
	)
}

export default CoffeeModifyForm;