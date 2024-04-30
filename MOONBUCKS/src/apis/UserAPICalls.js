import { request } from "./Api";
import { login, getUserlist, getUser, registUser, modifyUser, deleteUser } from "../modules/UserModule";

/* 로그인 정보 전달 받는 함수 */
export function callLoginAPI(loginInfo) {

	console.log('login api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const userList = await request('GET', '/user');

		/* id와 password 일치 여부 확인 - 서버에서 이루어져야 하는 로직 */
		/* 배열의 find 메소드 : 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환 */
		const result = await userList.find(user => user.id === loginInfo.id && user.password === loginInfo.password);

		console.log('login result : ', result);     // 해당 user 객체 반환

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(login(result));

	}
}

export function callGetUserListAPI() {

	console.log('getUserList api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const result = await request('GET', '/user');
		console.log('getUserList result : ', result);

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(getUserlist(result));
	}
}

export function callGetUserAPI(nickname) {

	console.log('getUser api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/user?nickname=${nickname}`);
		console.log('getUser result : ', result);

		dispatch(getUser(result[0]));
	}
}

export function callRegistUserAPI(user) {

	console.log('registUser api calls...');

	return async (dispatch, getState) => {

		const result = await request('POST', '/user/', user);
		console.log('registUser result : ', result);

		dispatch(registUser(result));
	}
}

export function callModifyUserAPI(user) {

	console.log('modifyUser api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/user/${user.id}`, user);
		console.log('modifyUser result : ', result);

		dispatch(modifyUser(result));
	}
}

export function callDeleteUserAPI(id) {

	console.log('deleteUser api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/user/${id}`);
		console.log('deleteUser result : ', result);

		dispatch(deleteUser(result));
	}
}