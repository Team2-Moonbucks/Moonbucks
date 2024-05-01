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
			<div className='DetailBox CoffeeBox'>
				<table>
					<tbody>
						<tr>
							<td className='tdimg' colSpan={2}><img src={coffee.detail.image} style={{ maxWidth: 500 }} alt={coffee.menuName} /></td>
						</tr>
						<tr class="space"></tr>
						<tr>
							<td><span>이름</span>|</td>
							<td>{coffee.coffeeName}</td>
						</tr>
						<tr>
							<td><span>가격</span>|</td>
							<td>{coffee.coffeePrice.toLocaleString()}원</td>
						</tr>
						<tr>
							<td><span>종류</span>|</td>
							<td>{coffee.categoryName}</td>
						</tr>
						<tr>
							<td><span>상세</span>|</td>
							<td>{coffee.detail.description}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	);
}

export default Coffee;