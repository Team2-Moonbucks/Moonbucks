
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetCoffeeAPI, callRegistCoffeeAPI } from '../../apis/CoffeeAPICalls';


function CoffeeRegistForm() {

	const result = useSelector(state => state.coffeeReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const coffeeList = result.coffeeList;
	const nameCaution = document.getElementById('nameCaution');

	
	

	/* 입력 값 state 저장 */
	const [registCoffee, setRegistCoffee] = useState(
		{
			id: 0,
			coffeeName: '',
			coffeePrice: 0,
			categoryName: '커피',
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

		if(coffeeList){
			const userIdValue = document.getElementById('userId').value;
			const nameCaution = document.getElementById('nameCaution');
			let isDuplicateName = coffeeList.some(user => user.coffeeName === userIdValue);

			console.log('isDuplicateName 동작중', isDuplicateName);

			if(userIdValue.trim() === ''){
				nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else if(isDuplicateName){
				nameCaution.innerHTML = '  * 이미 존재하는 메뉴명입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else{
				nameCaution.innerHTML = '  * 사용가능한 메뉴명입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
			}
		}

		

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
					image: registCoffee.detail.image
				};
				break;
		}


		setRegistCoffee(
			{
				...registCoffee,
				id: `${coffeeList.length+1}`,
				[name]: value
			}
		);

		console.log(registCoffee);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
	
		// 파일 이름을 가져와서 이미지 경로 대신에 파일 이름으로 설정
		setRegistCoffee({
			...registCoffee,
			detail: {
				description: registCoffee.detail.description,
				image: `/images/${file.name}` // 파일 이름으로 이미지 경로 설정
			}
		});
	
		console.log(registCoffee);
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
			/* 메뉴 등록 완료 확인 후 /coffee로 이동 */
			if (result.regist) {
				alert('메뉴 등록');
				navigate(`/coffee`);
			}
		},
		[result]
	);


	// useEffect(
	// 	() => {
	// 		dispatch(callGetCoffeeAPI());
	// 	}
	// )

	// useEffect(
	// 	() => {

	// 		if(coffeeList && coffeeList.length > 0) {

	// 			let maxId = coffeeList.reduce((max, coffee) => Math.max(max, coffee.id, 0));
	// 			let nextId = maxId + 1;

	// 			console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

	// 			setRegistCoffee(
	// 				{
	// 					...registCoffee,
	// 					id: `${nextId}`
	// 				}
	// 			);
	// 		}
	// 	}
	// )

	const onClickHandler = () => {
		/* registCoffee에 대한 유효성 검사 후 호출 */
		dispatch(callRegistCoffeeAPI(registCoffee));
	}

	return (
		<div className='formTotal'>
			<label>메뉴 이름</label><span id="nameCaution" className='nameCaution'></span><br/>
			<input type="text"  name="coffeeName" id = "userId" onChange={onChangeHandler} className='nameCaution'/>
			<br />
			<label>메뉴 가격</label><br/>
			<input type="number" name="coffeePrice" value={registCoffee.coffeePrice} onChange={onChangeHandler} />
			<br />
			<label>카테고리</label><br/>
			<select name="categoryName" value={registCoffee.categoryName} onChange={onChangeHandler}>
				<option>커피</option>
				<option>차</option>
				<option>블렌디드</option>
			</select>
			<br />
			<label>설명</label><br/>
			<textarea name="description" value={registCoffee.detail.description} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진</label><br/>
			<input
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler} />
			<br />
			<button onClick={onClickHandler}>메뉴 등록</button>
		</div>
	);
}

export default CoffeeRegistForm;