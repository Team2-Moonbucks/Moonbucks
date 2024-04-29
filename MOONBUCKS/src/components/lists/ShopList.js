import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ShopItem from '../items/ShopItem';
import { callGetShoplistAPI } from '../../apis/ShopAPICalls';


function ShopList() {

	const result = useSelector(state => state.shopReducer);
	const shopList = result.shoplist;
	const dispatch = useDispatch();

	console.log('shopList : ', shopList);

	useEffect(
		() => {
			/* shopList 호출 API */
			dispatch(callGetShoplistAPI());
		},
		[]
	);


	return (
		shopList && (
			<div className="shopBox ListBox">
				{shopList.map(shop => <ShopItem key={shop.id} shop={shop} />)}
			</div>
		)
	);
}

export default ShopList;