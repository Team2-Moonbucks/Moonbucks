import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import BoardItem from '../items/BoardItem';
import { callGetBoardListAPI } from "../../apis/BoardAPICalls";


function BoardList() {

	const result = useSelector(state => state.boardReducer);
	const boardList = result.boardlist;
	const dispatch = useDispatch();

	console.log('boardList : ', boardList);

	useEffect(
		() => {
			/* boardList 호출 API */
			dispatch(callGetBoardListAPI());
		},
		[]
	);


	return (
		boardList && (
			<div className="boardBox">
				{boardList.map(board => <BoardItem key={board.id} board={board} />)}
			</div>
		)
	);
}

export default BoardList;