import { Link } from 'react-router-dom';

function BoardItem({ board }) {

	return (
		<Link to={`/board/${board.id}`}>
			<div className="boardItem">
				<ul>
					<li>{board.title}</li>
					<li>{board.content}</li>
					<li>{board.author}</li>
					<li>{board.date}</li>
				</ul>
			</div>
		</Link>
	);
}

export default BoardItem;