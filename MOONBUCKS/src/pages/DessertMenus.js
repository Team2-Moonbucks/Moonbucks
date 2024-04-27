import DessertList from "../components/lists/DessertList";
import { useNavigate } from "react-router-dom";

function DessertMenus() {

	const isAuthorized = !!localStorage.getItem('isLogin');
	const navigate = useNavigate();

	return (
		<div>
			<h1>Dessert Menu List {(isAuthorized) && <button onClick={() => navigate(`/dessert/regist`)}>메뉴 추가</button>} </h1>
			<DessertList />
		</div>
	);
}

export default DessertMenus;