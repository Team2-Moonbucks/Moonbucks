import { Link } from 'react-router-dom';

function MenuItem({ menu }) {

	return (
		<Link to={`/menu/${menu.id}`}>
			<div className='menuItem'>
				<img src={menu.detail.image} alt={menu.menuName}/>
			</div>
			<div className="menuItem">
				<h3>{menu.menuName}</h3>
			</div>
		</Link>
	);
}

export default MenuItem;