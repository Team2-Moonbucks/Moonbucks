import { Navigate } from 'react-router-dom';
import UserModifyForm from "../components/form/UserModifyForm";

function UserModify(){

    /* 관리자 로그인 상태 확인 */
	const isUser = !!localStorage.getItem('isUser');

	if (!isUser) {
		return <Navigate to="/login" replace={true} />
	}

    return (
        <div className='pageTitle'>
        <h1>회원 정보 수정 페이지</h1>
        <hr/>
        <UserModifyForm/>
    </div>
    );
}

export default UserModify;
