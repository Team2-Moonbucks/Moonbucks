import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MenuItem from '../items/MenuItem';
import { callGetMenuListAPI } from "../../apis/MenuAPICalls";


function MenuList() {

	const result = useSelector(state => state.menuReducer);
	const menuList = result.menulist;
	const dispatch = useDispatch();

	console.log('result 결과값은 다음과 같습니다.',result);
	console.log(menuList);

	useEffect(
		() => {
			/* menuList 호출 API */
			dispatch(callGetMenuListAPI());
		},
		[]
	);


	return (
		menuList && (
			<div className="menuBox">
				{menuList.map(menu => <MenuItem key={menu.id} menu={menu} />)}
			</div>
		)
	);
}

export default MenuList;