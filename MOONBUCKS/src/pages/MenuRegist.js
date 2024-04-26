
import { Navigate } from 'react-router-dom';
import MenuRegistForm from '../components/form/MenuRegistForm';

function MenuRegist() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	if (!isAdmin) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<h1>메뉴 등록 페이지</h1>
			<MenuRegistForm />
		</>
	);
}

export default MenuRegist;