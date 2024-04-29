import ShopList from "../components/lists/ShopList";
import { useNavigate } from "react-router-dom";

function Shops() {

	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	const navigate = useNavigate();

	return (
		<div className="pageTitle">
			<h1>매장 목록 {(isAdmin) && <button onClick={() => navigate(`/shop/regist`)}>매장 추가</button>} </h1>
			<div className="ListContainer">
			<ShopList />
			</div>
		</div>
	);
}

export default Shops;