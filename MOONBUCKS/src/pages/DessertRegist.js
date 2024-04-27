
import { Navigate } from 'react-router-dom';
import DessertRegistForm from '../components/form/DessertRegistForm';

function DessertRegist() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	if (!isAuthorized) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<h1>Dessert 등록 페이지</h1>
			<DessertRegistForm />
		</>
	);
}

export default DessertRegist;