import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (Dessert) */						// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
const GET_DESSERTLIST = 'dessert/GET_DESSERTLIST';		// -> getDessertlist()
const GET_DESSERT = 'dessert/GET_DESSERT';				// -> getDessert()
const REGIST_DESSERT = 'dessert/REGIST_DESSERT';			// -> registDessert()
const MODIFY_DESSERT = 'dessert/MODIFY_DESSERT';			// -> modifyDessert()
const DELETE_DESSERT = 'dessert/DELETE_DESSERT';			// -> deleteDessert()

/* Action Functions (Dessert) */
export const { dessert: { getDessertlist, getDessert, registDessert, modifyDessert, deleteDessert } } = createActions({
    [GET_DESSERTLIST]: (res) => ({ dessertList: res }),
    [GET_DESSERT]: (res) => ({ dessert: res }),
    [REGIST_DESSERT]: (res) => ({ regist: res }),
    [MODIFY_DESSERT]: (res) => ({ modify: res }),
    [DELETE_DESSERT]: (res) => ({ delete: res }),
});

/* Reducer (Dessert) */
const dessertReducer = handleActions(
	{
		[GET_DESSERTLIST]: (state, { payload }) => {
			return payload;
		},
		[GET_DESSERT]: (state, { payload }) => {
			return payload;
		},
		[REGIST_DESSERT]: (state, { payload }) => {
			return payload;
		},
		[MODIFY_DESSERT]: (state, { payload }) => {
			return payload;
		},
		[DELETE_DESSERT]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default dessertReducer;

