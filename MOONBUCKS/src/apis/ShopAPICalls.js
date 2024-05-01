import { request } from "./Api";
import { getShoplist, getShop, registShop, modifyShop, deleteShop } from "../modules/ShopModule";


export function callGetShoplistAPI(shopCategory) {
	const endpoint = shopCategory === '전체보기' ? '/shop' : `/shop?shopCategory=${shopCategory}`;
	console.log('getShoplist api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const result = await request('GET', endpoint);
		console.log('getShoplist result : ', result);

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(getShoplist(result));
	}
}

export function callGetShopAPI(id) {

	console.log('getShop api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/shop?id=${id}`);
		console.log('getShop result : ', result[0]);

		dispatch(getShop(result[0]));
	}
}

export function callRegistShopAPI(shop) {

	console.log('registShop api calls...');

	return async (dispatch, getState) => {

		const result = await request('POST', '/shop/', shop);
		console.log('registShop result : ', result);

		dispatch(registShop(result));
	}
}

export function callModifyShopAPI(shop) {

	console.log('modifyShop api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/shop/${shop.id}`, shop);
		console.log('modifyShop result : ', result);

		dispatch(modifyShop(result));
	}
}

export function callDeleteShopAPI(id) {

	console.log('deleteShop api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/shop/${id}`);
		console.log('deleteShop result : ', result);

		dispatch(deleteShop(result));
	}
}
