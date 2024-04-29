import { Link } from 'react-router-dom';

function BoardItem({ board }) {

	return (
		<Link to={`/board/${board.id}`}>
			<div className="boardItem">
				<h3>제목 : {board.title}</h3>
				<h3>내용 : {board.content}</h3>
				<h4>작성자 : {board.author}</h4>
			</div>
		</Link>
	);
}

export default BoardItem;