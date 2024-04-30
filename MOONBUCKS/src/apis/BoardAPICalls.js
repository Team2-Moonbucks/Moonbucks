import { request } from "./Api";
import { getBoardlist, getBoard, registBoard, modifyBoard, deleteBoard } from "../modules/BoardModule";

export function callGetBoardListAPI() {

	console.log('getBoardList api calls...');

	/* redux-thunk(미들 웨어)를 이용한 비동기 처리 */
	return async (dispatch, getState) => {

		/* Api의 axios 처리 참조  */
		const result = await request('GET', '/board');
		console.log('getBoardList result : ', result);

		/* action 생성 함수에 결과 전달하며 dispatch 호출 */
		dispatch(getBoardlist(result));
	}
}

export function callGetBoardAPI(id) {

	console.log('getBoard api calls...');

	return async (dispatch, getState) => {

		const result = await request('GET', `/board/${id}`);
		console.log('getBoard result : ', result);

		dispatch(getBoard(result));
	}
}

export function callRegistBoardAPI(board) {

	console.log('registBoard api calls...');

	return async (dispatch, getState) => {

		const boardWithDate = {
            ...board,
            date: new Date().toString()
        };

		const result = await request('POST', '/board/', board, boardWithDate);
		console.log('registBoard result : ', result);

		dispatch(registBoard(result));
	}
}

export function callModifyBoardAPI(board) {

	console.log('modifyBoard api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/board/${board.id}`, board);
		console.log('modifyBoard result : ', result);

		dispatch(modifyBoard(result));
	}
}

export function callDeleteBoardAPI(id) {

	console.log('deleteBoard api calls...');

	return async (dispatch, getState) => {

		const result = await request('DELETE', `/board/${id}`);
		console.log('deleteBoard result : ', result);

		dispatch(deleteBoard(result));
	}
}
