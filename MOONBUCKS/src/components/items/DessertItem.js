import { Link } from 'react-router-dom';

function DessertItem({ dessert }) {

	return (
		
				
			<Link to={`/dessert/${dessert.id}`}>
				<div className='dessertItem'>
					<img src={dessert.detail.image} alt={dessert.menuName}/>
					<h3>{dessert.menuName}</h3>
				</div>
			</Link>

	);
}

export default DessertItem;