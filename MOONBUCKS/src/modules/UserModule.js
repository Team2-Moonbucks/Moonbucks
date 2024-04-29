import { createActions, handleActions } from "redux-actions";

/* 초기 state값 */
const initialState = {};

/* Action Types (User) */									// 타입 별 생성되는 액션 함수 이름(LARGE_SNAKE_CASE -> camelCase)
export const LOGIN = 'user/LOGIN';							// -> login()
export const RESET_LOGIN_USER = 'user/RESET_LOGIN_USER';	// -> resetLoginUser()

/* Action Functions (User) */
export const { user: { login, resetLoginUser } } = createActions({
	[LOGIN]: (res) => ({ res }),
	[RESET_LOGIN_USER]: (res = initialState) => ({ res }),
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
			return res;

		},
		[RESET_LOGIN_USER]: (state, { payload: { res } }) => {

			return res;

		}
	},
	initialState
);

export default userReducer;

