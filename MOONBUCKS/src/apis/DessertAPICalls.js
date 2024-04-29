import { request } from "./Api";
import { getDessertlist, getDessert, registDessert, modifyDessert, deleteDessert } from "../modules/DessertModule";

export function callGetDessertListAPI(categoryName) {
    console.log('getDessertList api calls...');
    const endpoint = categoryName === '전체보기' ? '/dessert' : `/dessert?categoryName=${categoryName}`;
    return async (dispatch, getState) => {
        const result = await request('GET', endpoint);
        console.log('getDessertList result : ', result);
        dispatch(getDessertlist(result));
    }
}


export function callGetDessertAPI(id) {
    console.log('getDessert api calls...');

    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `/dessert/${id}`); // request 함수 사용
            console.log('getDessert result : ', result);
            dispatch(getDessert(result)); // 결과를 리덕스 스토어에 저장
        } catch (error) {
            console.error('Error fetching dessert:', error);
            // 에러 처리 로직을 추가할 수 있습니다. 예를 들어:
            // dispatch(showErrorMessage('Failed to fetch dessert.'));
        }
    }
}

export const callRegistDessertAPI = (dessert) => async (dispatch) => {
    try {
        const response = await request('POST', '/dessert/', dessert);
        dispatch(registDessert(response));
        return response;  // Axios 응답의 .data 속성 반환
    } catch (error) {
        console.error('Regist Dessert API error:', error);
        throw error;  // 에러를 다시 throw 하여 onClickHandler에서 catch 할 수 있게 함
    }
};

export function callModifyDessertAPI(dessert) {

	console.log('modifyDessert api calls...');

	return async (dispatch, getState) => {

		const result = await request('PUT', `/dessert/${dessert.id}`, dessert);
		console.log('modifyDessert result : ', result);

		if (result.success) { // 예를 들어, 서버 응답에 'success' 필드가 있다고 가정
            dispatch(modifyDessert(true)); // 성공 플래그와 함께 디스패치
        } else {
            dispatch(modifyDessert(false)); // 실패 플래그와 함께 디스패치
        }
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
