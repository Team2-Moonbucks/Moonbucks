import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callModifyUserAPI } from '../../apis/UserAPICalls';
import { callGetUserAPI } from '../../apis/UserAPICalls';

function UserModifyForm() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.userReducer);
	const user = result.user;
	const nickname = localStorage.getItem('LoginNickname');




	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* user 호출 API */
			dispatch(callGetUserAPI(nickname));
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
		/* modifyUser에 대한 유효성 검사 후 호출 */
		dispatch(callModifyUserAPI(modifyUser));
	}

	return (
		<div className='formTotal'>
			<h1>{nickname}님 회원 정보 수정</h1>
			<label>아이디 </label><br/>
			<input type="text" name="id" value={modifyUser.id} onChange={onChangeHandler} />
			<br />
			<label>닉네임 </label><br/>
			<input type="text" name="nickname" value={modifyUser.nickname} onChange={onChangeHandler} />
			<br />
			<label>Email </label><br/>
			<input type="text" name="email" value={modifyUser.email} onChange={onChangeHandler} />
			<br />
			<button onClick={onClickHandler}>정보 수정</button>
		</div>
	)
}

export default UserModifyForm;