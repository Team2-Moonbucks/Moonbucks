import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (Coffee) */						// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
const GET_COFFEE_LIST = 'coffee/GET_COFFEE_LIST';		// -> getCoffeeList()
const GET_COFFEE = 'coffee/GET_COFFEE';				// -> getCoffee()
const REGIST_COFFEE = 'coffee/REGIST_COFFEE';			// -> registCoffee()
const MODIFY_COFFEE = 'coffee/MODIFY_COFFEE';			// -> modifyCoffee()
const DELETE_COFFEE = 'coffee/DELETE_COFFEE';			// -> deleteCoffee()

/* Action Functions (Coffee) */
export const { coffee: { getCoffeeList, getCoffee, registCoffee, modifyCoffee, deleteCoffee } } = createActions({
	[GET_COFFEE_LIST]: (res) => ({ coffeeList: res }),
	[GET_COFFEE]: (res) => ({ coffee: res }),
	[REGIST_COFFEE]: (res) => ({ regist: res }),
	[MODIFY_COFFEE]: (res) => ({ modify: res }),
	[DELETE_COFFEE]: (res) => ({ delete: res }),
});

/* Reducer (Coffee) */
const coffeeReducer = handleActions(
	{
		[GET_COFFEE_LIST]: (state, { payload }) => {
			// console.log(payload);
			return payload;
		},
		[GET_COFFEE]: (state, { payload }) => {
			return payload;
		},
		[REGIST_COFFEE]: (state, { payload }) => {
			return payload;
		},
		[MODIFY_COFFEE]: (state, { payload }) => {
			return payload;
		},
		[DELETE_COFFEE]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default coffeeReducer;

