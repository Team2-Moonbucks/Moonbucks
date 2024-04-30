
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
	const nicknameCaution = document.getElementById('nicknameCaution');
	const pwdCaution = document.getElementById('pwdCaution');
	const pwdConfirmCaution = document.getElementById('pwdConfirmCaution');



	if(userList){
		const userNameValue = document.getElementById('userId').value;
		const nameCaution = document.getElementById('nameCaution');
		const pwd = document.getElementById('password').value;
		const pwdCaution = document.getElementById('pwdCaution');
		const nickname = document.getElementById('nickname').value;

		if(userNameValue.trim() === ''){
			nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			nameCaution.style = 'color : rgb(247, 51, 51)';
		} 

		if(nickname.trim() === ''){
			nicknameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			nicknameCaution.style = 'color : rgb(247, 51, 51)';
		} else{
			pwdCaution.innerHTML = ' ';
		}
		

		if(pwd.trim() === ''){
			pwdCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			pwdCaution.style = 'color : rgb(247, 51, 51)';
		} else{
			pwdCaution.innerHTML = ' ';
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

		/* 비밀번호 확인  */
		const pwd = document.getElementById('password').value;
		const pwdConfirm = document.getElementById('passwordConfirm').value;
		const pwdCaution = document.getElementById('pwdCaution');
		const pwdConfirmCaution = document.getElementById('pwdConfirmCaution');
		

		if(pwd.trim() === ''){
			pwdCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			pwdCaution.style = 'color : rgb(247, 51, 51)';
		} else{
			pwdCaution.innerHTML = ' ';
			pwdCaution.style = 'color : rgb(29, 252, 96)';
		}
		if(pwd.trim() != '' && pwd == pwdConfirm){
			pwdConfirmCaution.innerHTML = '  * 비밀번호가 일치합니다.';
			pwdConfirmCaution.style = 'color : rgb(29, 252, 96)';
		}else if(pwd.trim() != '' && pwd != pwdConfirm){
			pwdConfirmCaution.innerHTML = '  * 비밀번호가 일치하지 않습니다.';
			pwdConfirmCaution.style = 'color : rgb(247, 51, 51)';
		}else{
			pwdConfirmCaution.innerHTML = ' ';
		}

		const nickname = document.getElementById('nickname').value;
		const nicknameCaution = document.getElementById('nicknameCaution');

		if(nickname.trim() === ''){
			nicknameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
			nicknameCaution.style = 'color : rgb(247, 51, 51)';
		} else{
			nicknameCaution.innerHTML = ' ';
		}


		// setRegistUser(
		// 	{
		// 		...registUser,
		// 		[name]: value
		// 	}
		// );

		setRegistUser(prevState => {
			// name이 passwordConfirm이 아닌 경우에만 새로운 객체를 생성하여 업데이트합니다.
			if (name !== 'passwordConfirm') {
				return {
				...prevState,
				[name]: value
				};
			}
			// name이 passwordConfirm인 경우에는 현재 상태를 그대로 반환합니다.
			return prevState;
		});

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


	const onClickHandler = () => {
		/* registUser에 대한 유효성 검사 후 호출 */
		if(nameCaution.innerHTML == '  * 사용가능한 아이디입니다.'){
			if(pwdCaution.innerHTML == ' '){
				if(pwdConfirmCaution.innerHTML == '  * 비밀번호가 일치합니다.'){
					if(nicknameCaution.innerHTML == ' '){
						dispatch(callRegistUserAPI(registUser));
					}else{
						alert('닉네임은 반드시 작성해야합니다!');
						document.getElementById('nickname').focus();
					}
				}else{
					alert('비밀번호가 일치하지 않습니다!');
					document.getElementById('passwordConfirm').focus();
				}
			}else{
				alert('비밀번호는 반드시 작성해야합니다!');
				document.getElementById('password').focus();
			}
		}else if(nameCaution.innerHTML == '  * 중복된 아이디입니다.'){
			alert('중복된 아이디입니다! 다른 아이디를 사용해주세요');
			document.getElementById('userId').focus();
		}else if(nameCaution.innerHTML == '  * 반드시 작성해야하는 부분입니다.'){
			alert('아이디는 반드시 작성해야합니다!');
			document.getElementById('userId').focus();
		}
	}

	return (
		<div className='formTotal'>
			<label>아이디 </label><span id="nameCaution" className='nameCaution'></span>
			<input type="text" name="id" id="userId" onChange={onChangeHandler} />
			<br />
			<label>비밀번호 </label> <span id="pwdCaution" className='pwdCaution'></span>
			<input type="password" name="password" id="password" onChange={onChangeHandler} />
			<br />
			<label>비밀번호 확인 </label><span id="pwdConfirmCaution" className='pwdCaution'></span>
			<input type="password" name="passwordConfirm" id="passwordConfirm"  onChange={onChangeHandler} />
			<br />
			<label>닉네임 </label> <span id="nicknameCaution" className='nameCaution'></span>
			<input type="text" name="nickname" id="nickname" onChange={onChangeHandler} />
			<br />
			<label>E-mail </label>
			<input type="text" name="email" onChange={onChangeHandler} />
			<br />
			<button onClick={onClickHandler}>회원 등록</button>
			
		</div>
	);
}

export default UserRegistForm;