import { Link } from 'react-router-dom';

function CoffeeItem( {coffee} ) {

	console.log('coffee : ', coffee);

	return (
		<Link to={`/coffee/${coffee.id}`}>
			<div className='coffeeItem'>
				<img src={coffee.detail.image} alt={coffee.coffeeName}/>
				<h3> {coffee.coffeeName}</h3>			
			</div>
		</Link>
	);
}

export default CoffeeItem;