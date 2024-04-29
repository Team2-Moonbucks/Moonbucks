import MenuList from "../components/lists/MenuList";
import { useNavigate } from "react-router-dom";

function Menus() {

	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	const navigate = useNavigate();

	return (
		<div className="pageTitle">
			<h1>메뉴 목록 {(isAdmin) && <button onClick={() => navigate(`/menu/regist`)}>메뉴 추가</button>} </h1>
			<MenuList />
		</div>
	);
}

export default Menus;