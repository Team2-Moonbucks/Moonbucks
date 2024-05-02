import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callGetUserListAPI, callModifyUserAPI } from '../../apis/UserAPICalls';
import { callGetUserAPI } from '../../apis/UserAPICalls';
import Swal from "sweetalert2";


function UserModifyForm() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.userReducer);
	const user = result.user;
	const userlist = result.userlist;
	const nickname = localStorage.getItem('LoginNickname');
	const userId = localStorage.getItem('LoginID');
    const nameCaution = document.getElementById('nameCaution');



	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* user 호출 API */
			dispatch(callGetUserAPI(userId));
			dispatch(callGetUserListAPI());

			const userIdValue = document.getElementById('userId').value;
			const nameCaution = document.getElementById('nameCaution');
			
			if(userIdValue.trim() === nickname){
				nameCaution.innerHTML = '  * 기존의 닉네임입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
			}
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
				console.log('user : ', user);
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
			} else if(userIdValue.trim() === nickname){
				nameCaution.innerHTML = '  * 기존의 닉네임입니다.';
				nameCaution.style = 'color : rgb(29, 252, 96)';
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
				...modifyUser,
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
				Swal.fire({
					icon: "success",
					title: `회원정보가 수정되었습니다`,
					showConfirmButton: false,
					timer: 1000
				});
				navigate(`/mymoonbucks`);
			}
		},
		[result]
	);

	const onClickHandler = () => {

		if(nameCaution){
			if(nameCaution.innerHTML == '  * 중복된 닉네임입니다.'){
				Swal.fire({
					icon: "warning",
					html: `중복된 닉네임입니다. 다시 입력해주세요`,
					showCancelButton: false,
					confirmButtonColor: "#1A264B",
					confirmButtonText: "확인",
				});
				document.getElementById('userId').focus();
			}else if(nameCaution.innerHTML == '  * 반드시 작성해야하는 부분입니다.'){
				Swal.fire({
					icon: "warning",
					html: `닉네임은 반드시 작성해야 합니다.`,
					showCancelButton: false,
					confirmButtonColor: "#1A264B",
					confirmButtonText: "확인",
				});
				document.getElementById('userId').focus();
			}else{
				localStorage.setItem("LoginNickname",modifyUser.nickname);
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