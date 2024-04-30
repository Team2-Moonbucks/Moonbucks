
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetBoardAPI, callRegistBoardAPI } from '../../apis/BoardAPICalls';


function BoardRegistForm() {

	const result = useSelector(state => state.boardReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const boardList = result.boardlist;
	const nickname = localStorage.getItem('LoginNickname');
	

	/* 입력 값 state 저장 */
	const [registBoard, setRegistBoard] = useState(
		{
			id: 0,
			title: '',
			content: '',
			author: nickname,
			date: ''
		}
	);

	/* 입력 값 변경 시 이벤트 핸들러 */
	const onChangeHandler = (e) => {

		let name = e.target.name;
		let value = e.target.value;

		/* json-server에 저장될 데이터 타입 맞추기 위한 코드 */
		switch (name) {
			case 'isOrderable':
				value = !!value;
				break;
			case 'description':
				name = 'detail';
				value = {
					description: value,
					image: registBoard.detail.image
				};
				break;
		}

		const currentDateTime = new Date().toLocaleString();
		console.log('currentDateTime : ', currentDateTime.toLocaleString());
		console.log('boardList.length', boardList.length);

		setRegistBoard(
			{
				...registBoard,
				date: currentDateTime,
				[name]: value
			}
		);


		console.log(registBoard);

	}

	useEffect(
		() => {

			if(boardList && boardList.length > 0) {
				console.log('boardList : ', boardList);

				let maxId = boardList.reduce((max, board) => {
					const parsedId = parseInt(board.id, 10);
					return Math.max(max, isNaN(parsedId) ? 0 : parsedId);
				}, 0);
				let nextId = maxId + 1;

				console.log(`maxId:  ${maxId}, nextId: ${nextId}`);


				setRegistBoard(
					{
						...registBoard,
						id: `${nextId}`
					}
				);
			}
		},
		[]
	)

	/* 파일 첨부 시 동작하는 이벤트 핸들러 */
	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const base64 = await convertBase64(file);
		console.log(base64);
		setRegistBoard(
			{
				...registBoard,
				detail: {
					description: registBoard.detail.description,
					image: base64
				}
			}
		);

		console.log(registBoard);
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


	useEffect(
		() => {
			/* 메뉴 등록 완료 확인 후 /board로 이동 */
			if (result.regist) {
				alert('게시글 등록');
				navigate(`/board`);
			}
		},
		[result]
	);


	// useEffect(
	// 	() => {
	// 		dispatch(callGetBoardAPI());
	// 	}
	// )

	// useEffect(
	// 	() => {

	// 		if(boardList && boardList.length > 0) {

	// 			let maxId = boardList.reduce((max, board) => Math.max(max, board.id, 0));
	// 			let nextId = maxId + 1;

	// 			console.log(`maxId:  ${maxId}, nextId: ${nextId}`);

	// 			setRegistBoard(
	// 				{
	// 					...registBoard,
	// 					id: `${nextId}`
	// 				}
	// 			);
	// 		}
	// 	}
	// )

	const onClickHandler = () => {
		/* registBoard에 대한 유효성 검사 후 호출 */
		dispatch(callRegistBoardAPI(registBoard));
	}

	return (
		<div className='formTotal'>
			<label>게시글 제목</label><br/>
			<input type="text" name="title" value={registBoard.title} onChange={onChangeHandler} />
			<br />
			<label>내용</label><br/>
			<textarea name="content" value={registBoard.content} onChange={onChangeHandler}></textarea>
			<br />
			<label>작성자</label><br/>
			<input type="text" name="author" readOnly={true} value={registBoard.author} onChange={onChangeHandler} />
			<br />
			<button onClick={onClickHandler}>게시글 등록</button>
		</div>
	);
}

export default BoardRegistForm;