import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callModifyBoardAPI } from '../../apis/BoardAPICalls';
import { callGetBoardAPI } from '../../apis/BoardAPICalls';

function BoardModifyForm() {

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const result = useSelector(state => state.boardReducer);
	const board = result.board;
	const nickname = localStorage.getItem('LoginNickname');

	/* 수정할 메뉴 초기값 불러오기 */
	useEffect(
		() => {
			/* board 호출 API */
			dispatch(callGetBoardAPI(id));
		},
		[]
	);

	/* 입력 값 state 저장 */
	const [modifyBoard, setModifyBoard] = useState(
		{
			id: id,
			title: '',
			content: '',
			author: nickname,
			date: ''
		}
	);

	useEffect(
		()=>{
			if(board){
				setModifyBoard(
					{
						...board,
						id: id,
						title: board.title,
						content: board.content,
						author: board.author
					}
				);
			}
		},
		[board]
	)

	useEffect(
		()=>{
			if(result.modify !== undefined && Object.keys(result.modify).length !== 0){
				alert('게시물 수정');
				navigate('/board');
			}
		},
		[result]
	)



	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		const currentDateTime = new Date().toLocaleString();

		setModifyBoard(
			{
				...modifyBoard,
				id: id,
				date: currentDateTime,
				[name]: value
			}
		);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	// const fileChangeHandler = async (e) => {
	// 	const file = e.target.files[0];
	// 	const base64 = await convertBase64(file);
	// 	setModifyBoard(
	// 		{
	// 			...modifyBoard,
	// 			detail: {
	// 				description: modifyBoard.detail.description,
	// 				image: base64
	// 			}
	// 		}
	// 	);
	// }

	/* FileReader API를 통해 input type="file"에 첨부 된 파일을 base64 인코딩 형식으로 변환 */
	// const convertBase64 = (file) => {
	// 	return new Promise((resolve, reject) => {
	// 		const fileReader = new FileReader();
	// 		fileReader.readAsDataURL(file)
	// 		fileReader.onload = () => {
	// 			resolve(fileReader.result);
	// 		}
	// 		fileReader.onerror = (error) => {
	// 			reject(error);
	// 		}
	// 	})
	// }

	

	const onClickHandler = () => {
		/* modifyBoard에 대한 유효성 검사 후 호출 */
		dispatch(callModifyBoardAPI(modifyBoard));
	}

	return (
		<div className='formTotal'>
			<h1>{id}번 게시글 수정</h1>
			<label>게시글 제목</label><br/>
			<input type="text" name="title" value={modifyBoard.title} onChange={onChangeHandler} />
			<br />
			<label>작성자</label><br/>
			<input type="text" name="author" readOnly={true} value={modifyBoard.author} onChange={onChangeHandler} />
			<label>작성일</label><br/>
			<input type="text" name="author" readOnly={true} value={modifyBoard.date} onChange={onChangeHandler} />
			<label>내용</label><br/>
			<textarea name="content" value={modifyBoard.content} onChange={onChangeHandler}></textarea>
			<br />
			<button onClick={onClickHandler}>게시글 수정</button>
		</div>
	)
}

export default BoardModifyForm;