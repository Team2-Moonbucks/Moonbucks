import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetDessertAPI } from '../../apis/DessertAPICalls';

function Dessert({ id }) {

	const result = useSelector(state => state.dessertReducer);
	const dessert = result.dessert;
	const dispatch = useDispatch();

	useEffect(
		() => {
			/* dessert 호출 API */
			dispatch(callGetDessertAPI(id));
		},
		[id] // 종속성 배열에 id 추가
	);

	return (
		dessert && (
			<div className='DetailBox DessertBox'>
				<table>
					<tbody>
						<tr>
							<td className='tdimg' colSpan={2}><img src={dessert.detail.image} style={{ maxWidth: 500 }} alt={dessert.menuName} /></td>
						</tr>
						<tr class="space"></tr>
						<tr>
							<td><span>이름</span>|</td>
							<td>{dessert.menuName}</td>
						</tr>
						<tr>
							<td><span>가격</span>|</td>
							<td>{dessert.menuPrice.toLocaleString()}원</td>
						</tr>
						<tr>
							<td><span>종류</span>|</td>
							<td>{dessert.categoryName}</td>
						</tr>
						<tr>
							<td><span>상세</span>|</td>
							<td>{dessert.detail.description}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	);
}

export default Dessert;