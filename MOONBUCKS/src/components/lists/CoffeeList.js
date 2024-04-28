import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CoffeeItem from '../items/CoffeeItem';
import { callGetCoffeeListAPI } from "../../apis/CoffeeAPICalls";


function CoffeeList() {

	const result = useSelector(state => state.coffeeReducer);
	const coffeeList = result.coffeeList;
	const dispatch = useDispatch();
	console.log('1.  CoffeeList 파일의 나는요', result);
	console.log('useSelector', useSelector);

	console.log(coffeeList);

	useEffect(
		() => {
			/* coffeeList 호출 API */
			dispatch(callGetCoffeeListAPI());
		},
		[]
	);

	

	return (
		coffeeList && (
			<div className="coffeeBox">
				{coffeeList.map(coffee => <CoffeeItem key={coffee.id} coffee={coffee} />)}
			</div>
		)
	);
}

export default CoffeeList;