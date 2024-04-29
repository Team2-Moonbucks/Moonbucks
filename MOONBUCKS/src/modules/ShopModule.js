import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (Shop) */						// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
const GET_SHOPLIST = 'shop/GET_SHOPLIST';		// -> getShoplist()
const GET_SHOP = 'shop/GET_SHOP';				// -> getShop()
const REGIST_SHOP = 'shop/REGIST_SHOP';			// -> registShop()
const MODIFY_SHOP = 'shop/MODIFY_SHOP';			// -> modifyShop()
const DELETE_SHOP = 'shop/DELETE_SHOP';			// -> deleteShop()

/* Action Functions (Shop) */
export const { shop: { getShoplist, getShop, registShop, modifyShop, deleteShop } } = createActions({
	[GET_SHOPLIST]: (res) => ({ shoplist: res }),
	[GET_SHOP]: (res) => ({ shop: res }),
	[REGIST_SHOP]: (res) => ({ regist: res }),
	[MODIFY_SHOP]: (res) => ({ modify: res }),
	[DELETE_SHOP]: (res) => ({ delete: res }),
});

/* Reducer (Shop) */
const shopReducer = handleActions(
	{
		[GET_SHOPLIST]: (state, { payload }) => {
			return payload;
		},
		[GET_SHOP]: (state, { payload }) => {
			return payload;
		},
		[REGIST_SHOP]: (state, { payload }) => {
			return payload;
		},
		[MODIFY_SHOP]: (state, { payload }) => {
			return payload;
		},
		[DELETE_SHOP]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default shopReducer;

