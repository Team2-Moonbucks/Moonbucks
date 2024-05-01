import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callGetUserListAPI, callModifyUserAPI } from '../../apis/UserAPICalls';
import { callGetUserAPI } from '../../apis/UserAPICalls';

function UserModifyForm() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.userReducer);
	const user = result.user;
	const userlist = result.userlist;
	const nickname = localStorage.getItem('LoginNickname');
    const nameCaution = document.getElementById('nameCaution');




	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* user 호출 API */
			dispatch(callGetUserAPI(nickname));
			dispatch(callGetUserListAPI());
		},
		[]
	);

	/* 입력 값 state 저장 */
	const [modifyUser, setModifyUser] = useState(
		{
			id: '',
			nickname: '',
			email: '',
		}
	);

	useEffect(
		()=> {
			if(user){
				setModifyUser(
					{
						...user,
						nickname: user.nickname,
						email: user.email
					}
				)
	
			}
		},
		[user]
	)


	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		console.log('name : ', name);
		console.log('value : ', value);

		console.log('userlist : ', userlist);

		if(userlist){

			
            const userIdValue = document.getElementById('userId').value;
			const nameCaution = document.getElementById('nameCaution');
			let isDuplicateName = userlist.some(user => user.nickname === userIdValue);
			
			console.log('isDuplicateName : ', isDuplicateName);

            console.log('userIdValue : ', userIdValue);
			if(userIdValue.trim() === ''){
				nameCaution.innerHTML = '  * 반드시 작성해야하는 부분입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else if(isDuplicateName){
				nameCaution.innerHTML = '  * 중복된 닉네임입니다.';
				nameCaution.style = 'color : rgb(247, 51, 51)';
			} else{
				nameCaution.innerHTML = '  * 사용가능한 닉네임입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
			}
		}

		setModifyUser(
			{
				...user,
				[name]: value
			}
		);

		console.log('modifyUser : ', modifyUser);

	}


	useEffect(
		() => {

			/* 메뉴 수정 완료 확인 후 /user로 이동 */
			console.log('result 바뀔때마다 호출...', result);
			
			if (result.modify) {
				alert('회원 정보 수정');
				navigate(`/mymoonbucks`);
			}
		},
		[result]
	);

	const onClickHandler = () => {

		if(nameCaution){
			if(nameCaution.innerHTML == '  * 중복된 닉네임입니다.'){
				alert("중복된 닉네임입니다. 다시 입력해주세요");
				document.getElementById('userId').focus();
			}else if(nameCaution.innerHTML == '  * 반드시 작성해야하는 부분입니다.'){
				alert("닉네임은 반드시 작성해야합니다.");
				document.getElementById('userId').focus();
			}else{
				dispatch(callModifyUserAPI(modifyUser));
			}
		}
	}

	return (
		<div className='formTotal'>
			<h1>{nickname}님 회원 정보 수정</h1>
			<label>아이디 </label><br/>
			<input type="text" name="id" value={modifyUser.id} readOnly={true} onChange={onChangeHandler} />
			<br />
			<label>닉네임 </label><span id="nameCaution" className='nameCaution'></span><br/>
			<input type="text" name="nickname" id='userId' value={modifyUser.nickname} onChange={onChangeHandler} />
			<br />
			<label>Email </label><br/>
			<input type="text" name="email" value={modifyUser.email} onChange={onChangeHandler} />
			<br />
			<button onClick={onClickHandler}>정보 수정</button>
		</div>
	)
}

export default UserModifyForm;