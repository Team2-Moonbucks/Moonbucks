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
		[]
	);

	return (
		dessert && (
			<>
				<h3>메뉴 이름 : {dessert.menuName}</h3>
				<h3>메뉴 가격 : {dessert.menuPrice}</h3>
				<h3>메뉴 종류 : {dessert.categoryName}</h3>
				<h3>메뉴 상세 : {dessert.detail.description}</h3>
				<img src={dessert.detail.image} style={{ maxWidth: 500 }} alt={dessert.menuName} />
			</>
		)
	);
}

export default Dessert;