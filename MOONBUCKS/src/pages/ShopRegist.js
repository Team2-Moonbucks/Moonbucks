
import { Navigate } from 'react-router-dom';
import ShopRegistForm from '../components/form/ShopRegistForm';

function ShopRegist() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	if (!isAdmin) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<div className='pageTitle'>
			<h1>매장 등록</h1>
			<hr/>
			<ShopRegistForm />
		</div>
	);
}

export default ShopRegist;