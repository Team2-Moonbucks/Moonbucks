
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetUserListAPI, callRegistUserAPI } from '../../apis/UserAPICalls';


function UserRegistForm() {

	const result = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userList = result.userlist;
	const nameCaution = document.getElementById('nameCaution');

	if(userList){
		const userNameValue = document.getElementById('userId').value;
		const nameCaution = document.getElementById('nameCaution');

		if(userNameValue.trim() === ''){
			nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			nameCaution.style = 'color : rgb(247, 51, 51)';
		} 
	}

	/* 입력 값 state 저장 */
	const [registUser, setRegistUser] = useState(
		{
			id: 0,
			password: '',
			nickname: '',
			role: 'user',
			email: ''
		}
	);

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* 아이디 중복 체크 */
		if(userList){
			const userIdValue = document.getElementById('userId').value;
			const nameCaution = document.getElementById('nameCaution');
			let isDuplicateName = userList.some(user => user.id === userIdValue);

			if(userIdValue.trim() === ''){
				nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else if(isDuplicateName){
				nameCaution.innerHTML = '  * 중복된 아이디입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else{
				nameCaution.innerHTML = '  * 사용가능한 아이디입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
			}
		}
		

		setRegistUser(
			{
				...registUser,
				[name]: value
			}
		);

		console.log(registUser);

	}



	useEffect(
		() => {
			/* 회원 등록 완료 확인 후 메인으로 이동 */
			if (result.regist) {
				alert('회원 등록');
				navigate(`/`);
			}
		},
		[result]
	);

	useEffect(
		() => {
			dispatch(callGetUserListAPI());
		},
		[]
	)

	useEffect(
	() => {

			if(userList && userList.length > 0) {

				let maxId = userList.reduce((max, user) => Math.max(max, user.id, 0));
				let nextId = maxId + 1;

				console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

				setRegistUser(
					{
						...registUser,
						id: `${nextId}`
					}
				);
			}
		},
		[]
	)

	const onClickHandler = () => {
		/* registUser에 대한 유효성 검사 후 호출 */
		if(nameCaution.innerHTML == '  * 사용가능한 아이디입니다.'){
			dispatch(callRegistUserAPI(registUser));
		}else{
			alert('아이디는 반드시 작성해야합니다!');
			document.getElementById('userId').focus();
		}
	}

	return (
		<div className='formTotal'>
			<label>아이디 </label><span id="nameCaution" className='nameCaution'></span>
			<input type="text" name="id" id="userId" onChange={onChangeHandler} />
			<br />
			<label>비밀번호 </label>
			<input type="text" name="password" id="userAddr" onChange={onChangeHandler} />
			<br />
			<label>비밀번호 확인 </label>
			<input type="text" id="userPhone"  onChange={onChangeHandler} />
			<br />
			<label>닉네임 </label>
			<input type="text" name="nickname" onChange={onChangeHandler} />
			<br />
			<label>E-mail </label>
			<input type="text" name="email" onChange={onChangeHandler} />
			<br />
			<button onClick={onClickHandler}>회원 등록</button>
			
		</div>
	);
}

export default UserRegistForm;