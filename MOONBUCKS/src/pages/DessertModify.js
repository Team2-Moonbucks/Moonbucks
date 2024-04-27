import { Navigate } from 'react-router-dom';
import DessertModifyForm from '../components/form/DessertModifyForm';

function DessertModify() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	if (!isAuthorized) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<h1>Dessert 수정 페이지</h1>
			<DessertModifyForm />
		</>
	);
}

export default DessertModify;