import { request } from "./Api";
import { getCoffeeList, getCoffee, registCoffee, modifyCoffee, deleteCoffee } from "../modules/CoffeeModule";

export function callGetCoffeeListAPI() {

	console.log('getCoffeeList api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const result = await request('GET', '/coffee');
		// console.log('담겼냐getCoffeeList result : ', result); 

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		
		dispatch(getCoffeeList(result));
	}
}

export function callGetCoffeeAPI(id) {

	console.log('2. 메뉴 조회 요청 getCoffee api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/coffee/${id}`);
		console.log('getCoffee result : ', result);

		dispatch(getCoffee(result));
	}
}

export function callRegistCoffeeAPI(coffee) {

	console.log('registCoffee api calls...');

	return async (dispatch, getState) => {

		const result = await request('POST', '/coffee/', coffee);
		console.log('registCoffee result : ', result);

		dispatch(registCoffee(result));
	}
}

export function callModifyCoffeeAPI(coffee) {

	console.log('modifyCoffee api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/coffee/${coffee.id}`, coffee);
		console.log('modifyCoffee result : ', result);

		dispatch(modifyCoffee(result));
	}
}

export function callDeleteCoffeeAPI(id) {

	console.log('deleteCoffee api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/coffee/${id}`);
		console.log('deleteCoffee result : ', result);

		dispatch(deleteCoffee(result));
	}
}
