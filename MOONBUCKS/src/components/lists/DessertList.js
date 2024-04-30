import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DessertItem from '../items/DessertItem';
import { callGetDessertListAPI } from "../../apis/DessertAPICalls";


function DessertList() {

	const result = useSelector(state => state.dessertReducer);
	const dessertList = result.dessertList;
	const dispatch = useDispatch();

	console.log('result 결과값은 다음과 같습니다.',result);
	console.log('dessertList : ', dessertList);
	

	useEffect(
		() => {
			/* dessertList 호출 API */
			console.log('callGetDessertListAPI() 호출...');
			dispatch(callGetDessertListAPI());
		},
		[]
	);


	return (


			dessertList && (
				<div className="dessertBox">
					{dessertList.map(dessert => <DessertItem key={dessert.id} dessert={dessert} />)}
				</div>
		)

	);
}

export default DessertList;