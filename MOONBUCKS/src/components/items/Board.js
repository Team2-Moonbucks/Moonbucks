import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetBoardAPI } from '../../apis/BoardAPICalls';

function Board({ id }) {

	const result = useSelector(state => state.boardReducer);
	const board = result.board;
	const dispatch = useDispatch();

	useEffect(
		() => {
			/* board 호출 API */
			dispatch(callGetBoardAPI(id));
		},
		[]
	);

	return (
		board && (
			<>
				<h3>제목 : {board.title}</h3>
				<h3>내용 : {board.content}</h3>
				<h4>작성자 : {board.author}</h4>
			</>
		)
	);
}

export default Board;