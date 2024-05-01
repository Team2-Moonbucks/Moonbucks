import  React from 'react';
import { useSelector } from "react-redux";
import DessertItem from '../items/DessertItem';



function DessertList({ searchTerm }) {

	// const result = useSelector(state => state.dessertReducer);
	// const dessertList = result.dessertList;
	// const dispatch = useDispatch();

	// console.log('result 결과값은 다음과 같습니다.',result);
	// console.log('dessertList : ', dessertList);
	

	// useEffect(
	// 	() => {
	// 		/* dessertList 호출 API */
	// 		console.log('callGetDessertListAPI() 호출...');
	// 		dispatch(callGetDessertListAPI());
	// 	},
	// 	[dispatch, searchTerm]
	// );

	const dessertList = useSelector(state => state.dessertReducer.dessertList) || []; // 여기에서 수정: undefined 방지;
	const filteredDesserts = searchTerm
	? dessertList.filter(dessert =>
		dessert.menuName.toLowerCase().includes(searchTerm.toLowerCase())
	  )
	: dessertList;

	return (
		<div className="dessertBox">
			{filteredDesserts.map(dessert => (
				<DessertItem key={dessert.id} dessert={dessert} />
			))}
		</div>
	);
	}

	export default DessertList;