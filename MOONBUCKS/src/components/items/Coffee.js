import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetCoffeeAPI } from '../../apis/CoffeeAPICalls';

function Coffee({id}) {

	const result = useSelector(state => state.coffeeReducer);
	const coffee = result.coffee;
	const dispatch = useDispatch();

	useEffect(
		() => {
			/* coffee 호출 API */
			dispatch(callGetCoffeeAPI(id));
		},
		[]
	);

	return (
		coffee && (
			<>
				<h3>메뉴 이름 : {coffee.coffeeName}</h3>
				<h3>메뉴 가격 : {coffee.coffeePrice}</h3>
				<h3>메뉴 종류 : {coffee.categoryName}</h3>
				<h3>메뉴 상세 : {coffee.detail.description}</h3>
				<img src={coffee.detail.image} style={{ maxWidth: 500 }} alt={coffee.coffeeName} />
			</>
		)
	);
}

export default Coffee;