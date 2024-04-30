import { Link } from 'react-router-dom';

function CoffeeItem( {coffee} ) {

	console.log('coffee : ', coffee);

	return (
		<Link to={`/coffee/${coffee.id}`}>
			<div className='CoffeeItem'>
               <img src={coffee.detail.image} alt={coffee.coffeeName}/>
            </div>
			<div className="coffeeItem">
				<h3> {coffee.coffeeName}</h3>
				
				
			</div>
		</Link>
	);
}

export default CoffeeItem;