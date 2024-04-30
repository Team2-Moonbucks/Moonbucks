import { createActions, handleActions } from 'redux-actions';
import * as BoardAPI from '../apis/BoardAPI';

// 새로운 액션 타입 및 생성자
const FETCH_POSTS_SUCCESS = 'board/FETCH_POSTS_SUCCESS';
const FETCH_POSTS_FAIL = 'board/FETCH_POSTS_FAIL';

export const { fetchPostsSuccess, fetchPostsFail } = createActions({
    FETCH_POSTS_SUCCESS: (posts) => ({ posts }),
    FETCH_POSTS_FAIL: (error) => ({ error }),
});

// ThunkfetchPostsThunk
export const fetchPostsThunk = () => async (dispatch) => {
    try {
        const posts = await BoardAPI.fetchPosts();
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        dispatch(fetchPostsFail(error.message));
    }
};


/* 초기 state값 */
const initialState = {

    boardlist: [],  // 게시판 목록
    board: {},      // 개별 게시판 정보
    regist: {},     // 등록 작업 상태
    modify: {},     // 수정 작업 상태
    delete: {}      // 삭제 작업 상태
    
};

/* Action Types (Board) */
const GET_BOARDLIST = 'board/GET_BOARDLIST';        // -> getBoardlist()
const GET_BOARD = 'board/GET_BOARD';                // -> getBoard()
const REGIST_BOARD = 'board/REGIST_BOARD';          // -> registBoard()
const MODIFY_BOARD = 'board/MODIFY_BOARD';          // -> modifyBoard()
const DELETE_BOARD = 'board/DELETE_BOARD';          // -> deleteBoard()

/* Action Functions (Board) */
export const { board: { getBoardlist, getBoard, registBoard, modifyBoard, deleteBoard } } = createActions({
    [GET_BOARDLIST]: (res) => ({ boardlist: res }),
    [GET_BOARD]: (res) => ({ board: res }),
    [REGIST_BOARD]: (res) => ({ regist: res }),
    [MODIFY_BOARD]: (res) => ({ modify: res }),
    [DELETE_BOARD]: (res) => ({ delete: res }),
});

/* Reducer (Board) */
const boardReducer = handleActions(
    {
        [GET_BOARDLIST]: (state, { payload }) => {
			return payload;
        },
        [GET_BOARD]: (state, { payload }) => {
            return payload;
        },
        [REGIST_BOARD]: (state, { payload }) => {
			return payload;
        },
        [MODIFY_BOARD]: (state, { payload }) => {
			return payload;
        },
        [DELETE_BOARD]: (state, { payload }) => {
			return payload;
        },
        [FETCH_POSTS_SUCCESS]: (state, { payload }) => ({
            ...state,
            boardlist: payload.posts,
        }),
        [FETCH_POSTS_FAIL]: (state, { payload }) => ({
            ...state,
            error: payload.error,
        }),
    }, 
    initialState
);

export default boardReducer;
