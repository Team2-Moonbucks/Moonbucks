import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CoffeeItem from '../items/CoffeeItem';
import { callGetCoffeeListAPI } from "../../apis/CoffeeAPICalls";

function CoffeeList({ category, searchTerm }) {

    
    const result = useSelector(state => state.coffeeReducer);
    const coffeeList = result.coffeeList || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callGetCoffeeListAPI());
    }, [dispatch]);

    const filteredCoffeeList = coffeeList.filter(coffee =>
        (category === '전체' || coffee.categoryName === category) &&
        coffee.coffeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="coffeeBox">
            {filteredCoffeeList.length > 0 ? (
                filteredCoffeeList.map(coffee => <CoffeeItem key={coffee.id} coffee={coffee} />)
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
}

export default CoffeeList;
