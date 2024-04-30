import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteBoardAPI } from '../apis/BoardAPICalls';
import Board from '../components/items/Board';

function BoardDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isLogin');
	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const result = useSelector(state => state.boardReducer);

	const updateHandler = () => navigate(`/board/modify/${id}`);
	const deleteHandler = () => dispatch(callDeleteBoardAPI(id));

	useEffect(
		() => {
			/* 메뉴 삭제 완료 확인 후 /board로 이동 */
			if (result.delete) {
				alert('게시글 삭제');
				navigate(`/board`);
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<div>
			<h1>메뉴 상세</h1>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isAdmin) &&
					<>
						<button onClick={updateHandler}>게시글 수정</button>
						<button onClick={deleteHandler}>게시글 삭제</button>
					</>
				}
			</h1>
			<Board id={id} />
		</div>
	);
}

export default BoardDetail;