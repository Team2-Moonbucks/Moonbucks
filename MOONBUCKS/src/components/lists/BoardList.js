import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import BoardItem from '../items/BoardItem';
import { callGetBoardListAPI } from "../../apis/BoardAPICalls";


function BoardList({ title, searchTerm }) {

	const result = useSelector(state => state.boardReducer);
	const boardList = result.boardlist || [];
	const dispatch = useDispatch();

	console.log('boardList : ', boardList);

	useEffect(() => {
        if (boardList.length === 0) { // 데이터가 없을 경우 API 호출
            dispatch(callGetBoardListAPI());
        }
    }, [dispatch]);

	useEffect(
		() => {
			/* boardList 호출 API */
			dispatch(callGetBoardListAPI());
		},
		[]
	);

	const filteredBoardList = boardList.filter(board => 
        (title === '전체' || board.title === title) &&
        board.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


	return (
		boardList && (
			<div className="boardBox">
				<ul>
					<li>제목</li>
					<li>내용</li>
					<li>작성자</li>
					<li>작성일자</li>
				</ul>
				{filteredBoardList.length > 0 ? (
					filteredBoardList.map(board => <BoardItem key={board.title} board={board} />)
				) : (
					<p>해당 제목의 게시글이 없습니다.</p>
				)}
			</div>
		)
	
	);
}
	

export default BoardList;