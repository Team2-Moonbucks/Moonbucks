
import { Navigate } from 'react-router-dom';
import CoffeeRegistForm from '../components/form/CoffeeRegistForm';

function CoffeeRegist() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	if (!isAuthorized) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<h1>메뉴 등록 페이지</h1>
			<CoffeeRegistForm />
		</>
	);
}

export default CoffeeRegist;