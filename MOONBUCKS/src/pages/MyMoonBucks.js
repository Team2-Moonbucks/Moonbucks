import User from "../components/items/User";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteUserAPI } from '../apis/UserAPICalls';
import { resetLoginUser } from "../modules/UserModule";

function UserDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isLogin');
	/* 회원 로그인 상태 확인 */
	const isUser = !!localStorage.getItem('isUser');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const result = useSelector(state => state.userReducer);
	const nickname = localStorage.getItem('LoginNickname');
	const userId = localStorage.getItem('LoginID');

	const updateHandler = () => navigate(`/mymoonbucks/modify`);
	const deleteHandler = () => dispatch(callDeleteUserAPI(userId));


	/* 로그아웃 호출 시: localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동 */
	const logoutHandler = () => {
		localStorage.removeItem('LoginNickname');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('isUser');
		localStorage.removeItem('isLogin');
		dispatch(resetLoginUser());
		navigate('/');
	}

	useEffect(
		() => {
			/* 매장 삭제 완료 확인 후 /user로 이동 */
			if (result.delete) {
				alert('회원 정보 삭제');
				logoutHandler();
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<div className="pageTitle">
			<h1>회원 정보 상세</h1>
			<hr/>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isUser) &&
					<>
						<button className="modifyBtn" onClick={updateHandler}>정보 수정</button>
						<button className="deleteBtn" onClick={deleteHandler}>정보 삭제</button>
					</>
				}
			</h1>
			<User nickname={nickname} />
		</div>
	);
}

export default UserDetail;