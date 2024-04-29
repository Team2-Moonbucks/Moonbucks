import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CoffeeItem from '../items/CoffeeItem';
import { callGetCoffeeListAPI } from "../../apis/CoffeeAPICalls";

function CoffeeList({ category }) {
    const result = useSelector(state => state.coffeeReducer);
    const coffeeList = result.coffeeList || []; // 데이터가 없을 경우 빈 배열을 기본값으로 사용
    const dispatch = useDispatch();

    useEffect(() => {
        if (coffeeList.length === 0) { // 데이터가 없을 경우 API 호출
            dispatch(callGetCoffeeListAPI());
        }
    }, [dispatch]);

    const filteredCoffeeList = coffeeList.filter(coffee => category === '전체' || coffee.categoryName === category);

    return (
        <div className="coffeeBox">
            {filteredCoffeeList.length > 0 ? (
                filteredCoffeeList.map(coffee => <CoffeeItem key={coffee.id} coffee={coffee} />)
            ) : (
                <p>해당 카테고리의 커피가 없습니다.</p>
            )}
        </div>
    );
}

export default CoffeeList;
