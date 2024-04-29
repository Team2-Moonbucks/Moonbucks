import { Navigate } from 'react-router-dom';
import BoardModifyForm from '../components/form/BoardModifyForm';

function BoardModify() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	// const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	if (!isAdmin) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<h1>게시글 수정 페이지</h1>
			<BoardModifyForm />
		</>
	);
}

export default BoardModify;