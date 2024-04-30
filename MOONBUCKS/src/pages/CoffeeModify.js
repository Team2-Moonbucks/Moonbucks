import { Navigate } from 'react-router-dom';
import CoffeeModifyForm from '../components/form/CoffeeModifyForm';

function CoffeeModify() {

	/* 로그인 상태가 아닌데 호출할 경우 메인으로 */
	const isAuthorized = !!localStorage.getItem('isLogin');

	if (!isAuthorized) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<div className='pageTitle'>
			<h1>메뉴 수정 페이지</h1>
			<hr/>
			<CoffeeModifyForm />
		</div>
	);
}

export default CoffeeModify;