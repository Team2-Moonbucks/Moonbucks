
import { Navigate } from 'react-router-dom';
import UserRegistForm from '../components/form/UserRegistForm';

function SignIn(){

	/* 로그인 상태인데 호출할 경우 메인으로 */
	const loginStatus = !!localStorage.getItem('isLogin');
	console.log('isLogin', loginStatus);

	if(loginStatus) {
		return <Navigate to="/" replace={ true }/>
	}

	return (
		<div className='pageTitle'>
			<h1>회원가입</h1>
			<UserRegistForm/>
		</div>
	);
}

export default SignIn;