import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteBoardAPI, callGetBoardAPI } from '../apis/BoardAPICalls';
import Board from '../components/items/Board';
import Swal from "sweetalert2";


function BoardDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isLogin');
	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const result = useSelector(state => state.boardReducer);
	const board = result.board;
	const nickname = localStorage.getItem('LoginNickname');

	const updateHandler = () => navigate(`/board/modify/${id}`);
	const deleteHandler = () => {
		Swal.fire({
			title: "게시물을 삭제하겠습니까?",
			text: "삭제 후 되돌릴 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#1A264B",
			cancelButtonColor: "#d33",
			confirmButtonText: "삭제",
			cancelButtonText: "취소"
			}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
				title: "삭제 완료!",
				text: "게시물이 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
				});
				dispatch(callDeleteBoardAPI(id));
			}
		});

	};

	// const author = board
	console.log('board : ', board);

	const [author, setAuthor] = useState('');
	
	useEffect(
		() => {
			/* 메뉴 삭제 완료 확인 후 /board로 이동 */
			if (result.delete !== undefined && Object.keys(result.delete).length !== 0) {
				console.log('result.delete : ', result.delete);
				navigate(`/board`);
			}
		}, // eslint-disable-next-line
		[result]
	);

	useEffect(
		() => {
			/* board 호출 API */
			dispatch(callGetBoardAPI(id));
		},
		[]
	);

	useEffect(
		() =>{
			if(board){
				setAuthor(board.author);
			}

		},
		[board]
	)

	return (
		<div className='pageTitle'>
			<h1>게시물 상세</h1>
			<hr/>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isAdmin) &&
					<>
						<button className="modifyBtn" onClick={updateHandler}>게시글 수정</button>
						<button className="deleteBtn" onClick={deleteHandler}>게시글 삭제</button>
					</>
				}
				{(author == nickname) &&
					<>
						<button className="modifyBtn" onClick={updateHandler}>게시글 수정</button>
						<button className="deleteBtn" onClick={deleteHandler}>게시글 삭제</button>
					</>
				}

			</h1>
			<Board id={id} />
		</div>
	);
}

export default BoardDetail;