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
			<div className='DetailBox BoardBox'>
				<table>
					<tbody>
						<tr>
							<td><span>제목</span>|</td>
							<td>{board.title}</td>
						</tr>
						<tr>
							<td><span>작성자</span>|</td>
							<td>{board.date}</td>
						</tr>
						<tr>
							<td><span>작성일</span>|</td>
							<td>{board.author}</td>
						</tr>
						<tr>
							<td><span>내용</span>|</td>
							<td>{board.content}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	);
}

export default Board;