import React, { useState } from 'react';
import CoffeeList from "../components/lists/CoffeeList";
import { useNavigate } from "react-router-dom";

function CoffeeMenu() {
    const [checkedItems, setCheckedItems] = useState({
        checkbox1: true, // 전체보기가 기본적으로 체크되도록 변경
        checkbox2: false,
        checkbox3: false,
        checkbox4: false
    });

    const isAuthorized = !!localStorage.getItem('isLogin');
    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        const { checkbox1, checkbox2, checkbox3, checkbox4 } = checkedItems;

        if (name === 'checkbox1') {
            setCheckedItems({
                ...checkedItems,
                checkbox1: true,
                checkbox2: false,
                checkbox3: false,
                checkbox4: false
            });
        } else {
            const anyOtherChecked = checked || checkbox2 || checkbox3 || checkbox4;
            setCheckedItems({
                ...checkedItems,
                checkbox1: !anyOtherChecked,
                [name]: checked
            });
        }
    };

    const coffeeArray = Object.values(CoffeeList);
    const filteredCoffee = coffeeArray.filter(item => {
        const { checkbox1, checkbox2, checkbox3, checkbox4 } = checkedItems;
        if (checkbox1) return true; // 전체보기일 경우 모든 메뉴 반환
        if (checkbox2 && item.category === "커피") return true;
        if (checkbox3 && item.category === "차") return true;
        if (checkbox4 && item.category === "블렌디드") return true;
        return false;
    });

    return (
        <div>
            <h1>분류 보기 {(isAuthorized) && <button onClick={() => navigate(`/coffee/regist`)}>메뉴 추가</button>}</h1>
            <div>
                <input type="checkbox" name="checkbox1" checked={checkedItems.checkbox1} onChange={handleCheckboxChange} />
                <label>전체 보기</label>
            </div>
            <div>
                <input type="checkbox" name="checkbox2" checked={checkedItems.checkbox2} onChange={handleCheckboxChange} />
                <label>커피</label>
            </div>
            <div>
                <input type="checkbox" name="checkbox3" checked={checkedItems.checkbox3} onChange={handleCheckboxChange} />
                <label>차</label>
            </div>
            <div>
                <input type="checkbox" name="checkbox4" checked={checkedItems.checkbox4} onChange={handleCheckboxChange} />
                <label>블렌디드</label>
            </div>

            <CoffeeList coffeeList={filteredCoffee} />
        </div>
    );
}

export default CoffeeMenu;
