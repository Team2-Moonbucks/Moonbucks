import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (User) */									// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
export const LOGIN = 'user/LOGIN';							// -> login()
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';	// -> resetLoginUser()
const GET_MENULIST = 'user/GET_MENULIST';		// -> getUserlist()
const GET_MENU = 'user/GET_MENU';				// -> getUser()
const REGIST_MENU = 'user/REGIST_MENU';			// -> registUser()
const MODIFY_MENU = 'user/MODIFY_MENU';			// -> modifyUser()
const DELETE_MENU = 'user/DELETE_MENU';			// -> deleteUser()

/* Action Functions (User) */
export const { user: { login, resetLoginUser, getUserlist, getUser, registUser, modifyUser, deleteUser } } = createActions({
	[LOGIN]: (res) => ({ res }),
	[RESET_LOGIN_USER]: (res = initialState) => ({ res }),
	[GET_MENULIST]: (res) => ({ userlist: res }),
	[GET_MENU]: (res) => ({ user: res }),
	[REGIST_MENU]: (res) => ({ regist: res }),
	[MODIFY_MENU]: (res) => ({ modify: res }),
	[DELETE_MENU]: (res) => ({ delete: res }),
});

/* Reducer (User) */
const userReducer = handleActions(
	{
		[LOGIN]: (state, { payload: { res } }) => {

			if (res.role == 'admin') {
				/* localStorage에 로그인 상태 저장 */
				localStorage.setItem("LoginNickname", res.nickname);
				localStorage.setItem("isAdmin", true);
				localStorage.setItem("isLogin", true);	// localStorage가 무엇인지는 검색해서 (가볍게)공부해보세요
			} else if(res.role == 'user') {
				console.log('로그인 된 id : ', res.id);
				localStorage.setItem("LoginNickname", res.nickname);
				localStorage.setItem("isUser", true);
				localStorage.setItem("isLogin", true);
			} else {
				res = { message: 'LOGIN_FAIL' };
			}


			// if (res) {
			// 	/* localStorage에 로그인 상태 저장 */
			// 	console.log('로그인 된 id : ', res.id);
			// 	localStorage.setItem("isLogin", true);	// localStorage가 무엇인지는 검색해서 (가볍게)공부해보세요
			// } else {
			// 	res = { message: 'LOGIN_FAIL' };
			// }

			return res;

		},
		[RESET_LOGIN_USER]: (state, { payload: { res } }) => {

			return res;

		},
		[GET_MENULIST]: (state, { payload }) => {
			return payload;
		},
		[GET_MENU]: (state, { payload }) => {
			return payload;
		},
		[REGIST_MENU]: (state, { payload }) => {
			return payload;
		},
		[MODIFY_MENU]: (state, { payload }) => {
			return payload;
		},
		[DELETE_MENU]: (state, { payload }) => {
			return payload;
		}
	},
	initialState
);

export default userReducer;

