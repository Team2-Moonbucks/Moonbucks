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
			author: ''
		}
	);

	useEffect(
		()=>{
			if(board){
				setModifyBoard(
					{
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
			if(result.modify){
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

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		// switch (name) {
		// 	case 'boardPrice':
		// 		value = parseInt(value);
		// 		break;
		// 	case 'isOrderable':
		// 		value = !!value;
		// 		break;
		// 	case 'description':
		// 		name = 'detail';
		// 		value = {
		// 			description: value,
		// 			image: modifyBoard.detail.image
		// 		};
		// 		break;
		// }

		setModifyBoard(
			{
				...modifyBoard,
				id: id,
				[name]: value
			}
		);

	}

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setModifyBoard(
			{
				...modifyBoard,
				detail: {
					description: modifyBoard.detail.description,
					image: base64
				}
			}
		);
	}

	/* FileReader API를 통해 input type="file"에 첨부 된 파일을 base64 인코딩 형식으로 변환 */
	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file)
			fileReader.onload = () => {
				resolve(fileReader.result);
			}
			fileReader.onerror = (error) => {
				reject(error);
			}
		})
	}

	

	const onClickHandler = () => {
		/* modifyBoard에 대한 유효성 검사 후 호출 */
		dispatch(callModifyBoardAPI(modifyBoard));
	}

	return (
		<>
			<h1>{id}번 게시글 수정</h1>
			<label>게시글 제목 : </label>
			<input type="text" name="title" value={modifyBoard.title} onChange={onChangeHandler} />
			<br />
			<label>내용 : </label>
			<textarea name="content" value={modifyBoard.content} onChange={onChangeHandler}></textarea>
			<br />
			<label>사진 : </label>
			<input
				type="file"
				name="image"
				accept='image/*'
				onChange={fileChangeHandler} />
			<br />
			<button onClick={onClickHandler}>게시글 수정</button>
		</>
	)
}

export default BoardModifyForm;