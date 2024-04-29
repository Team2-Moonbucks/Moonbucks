import { Navigate } from 'react-router-dom';
import ShopModifyForm from '../components/form/ShopModifyForm';

function ShopModify() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	// const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	if (!isAdmin) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<div className='pageTitle'>
			<h1>매장 수정 페이지</h1>
			<hr/>
			<ShopModifyForm />
		</div>
	);
}

export default ShopModify;