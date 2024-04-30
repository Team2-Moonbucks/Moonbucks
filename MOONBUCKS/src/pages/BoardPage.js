import BoardList from "../components/lists/BoardList";
import { useNavigate } from "react-router-dom";

function BoardPage() {

	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
	const isUser = !!localStorage.getItem('isUser');

	const navigate = useNavigate();

	return (
		<div className="pageTitle">
			<h1>
				게시글 목록 
				{(isAdmin) && <button onClick={() => navigate(`/board/regist`)}>등록</button>}  
				{(isUser) && <button onClick={() => navigate(`/board/regist`)}>등록</button>}
			</h1>
			<hr/>
			<BoardList />
		</div>
	);
}



export default BoardPage;