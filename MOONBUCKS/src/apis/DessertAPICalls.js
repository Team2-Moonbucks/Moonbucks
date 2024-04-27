import { request } from "./Api";
import { getDessertlist, getDessert, registDessert, modifyDessert, deleteDessert } from "../modules/DessertModule";

export function callGetDessertListAPI() {

	console.log('getDessertList api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const result = await request('GET', '/dessert');
		console.log('여기서는 result가 담겼는가 getDessertList result : ', result);
		

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(getDessertlist(result));
	}
}

export function callGetDessertAPI(id) {

	console.log('getDessert api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/dessert/${id}`);
		console.log('getDessert result : ', result);

		dispatch(getDessert(result));
	}
}

export function callRegistDessertAPI(dessert) {

	console.log('registDessert api calls...');

	return async (dispatch, getState) => {

		const result = await request('POST', '/dessert/', dessert);
		console.log('registDessert result : ', result);

		dispatch(registDessert(result));
	}
}

export function callModifyDessertAPI(dessert) {

	console.log('modifyDessert api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/dessert/${dessert.id}`, dessert);
		console.log('modifyDessert result : ', result);

		dispatch(modifyDessert(result));
	}
}

export function callDeleteDessertAPI(id) {

	console.log('deleteDessert api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/dessert/${id}`);
		console.log('deleteDessert result : ', result);

		dispatch(deleteDessert(result));
	}
}
