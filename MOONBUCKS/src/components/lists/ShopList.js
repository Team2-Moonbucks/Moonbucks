import  React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ShopItem from '../items/ShopItem';
import { callGetShoplistAPI } from '../../apis/ShopAPICalls';


function ShopList({ searchTerm }) {

	// const result = useSelector(state => state.shopReducer);
	// const shopList = result.shoplist;
	// const dispatch = useDispatch();

	const shopList = useSelector(state => state.shopReducer.shoplist) || []; // 여기에서 수정: undefined 방지;
	const filteredShop = searchTerm
	? shopList.filter(shop =>
		shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
	)
	: shopList;

	console.log('shopList : ', shopList);

	// useEffect(
	// 	() => {
	// 		/* shopList 호출 API */
	// 		dispatch(callGetShoplistAPI());
	// 	},
	// 	[]
	// );


	return (
			<div className="shopBox ListBox">
			{/* {shopList.map(shop => <ShopItem key={shop.id} shop={shop} />)} */}
				{filteredShop.map(shop => (
				<ShopItem key={shop.id} shop={shop} />
				))}
			</div>		
	);
}

export default ShopList;