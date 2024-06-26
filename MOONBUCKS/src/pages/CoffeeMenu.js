import React, { useState } from 'react';
import CoffeeList from "../components/lists/CoffeeList";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function CoffeeMenu() {
    const [category, setCategory] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const isAuthorized = !!localStorage.getItem('isAdmin');
    const navigate = useNavigate();


    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setSearchTerm('');
        setActiveSearchTerm('');
        setSearchPerformed(false);
    };



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('내가 입력한 검색어 : ', searchTerm);
        if (searchTerm === "") {
            Swal.fire({
				icon: "warning",
				html: `검색어를 입력해주세요!`,
				showCancelButton: false,
				confirmButtonColor: "#1A264B",
				confirmButtonText: "확인",
			});
        } else {
            setActiveSearchTerm(searchTerm); // 사용자가 입력한 검색어로 검색 결과 값을 설정
            setSearchPerformed(true); // 검색 수행 상태를 true로 설정
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    

    return (
        <div className="pageTitle dessertTitle">
            <h1>음료 {(isAuthorized) && <button className='coffeeRegistBtn' onClick={() => navigate(`/coffee/regist`)}>메뉴 추가</button>}</h1>
            <button className={`${(category === '전체' ? 'active' : '')} TotalBtn` } onClick={() => handleCategoryChange('전체')}>전체보기</button>
            <button className={`${(category === '커피' ? 'active' : '')} coffeeBtn` }  onClick={() => handleCategoryChange('커피')}>커피</button>
            <button className={`${(category === '차' ? 'active' : '')} teaBtn` }  onClick={() => handleCategoryChange('차')}>티</button>
            <button className={`${(category === '블렌디드' ? 'active' : '')} blendedBtn` }  onClick={() => handleCategoryChange('블렌디드')}>블렌디드</button>
            <div className='searchBox'>
                <input type="search" placeholder='검색어를 입력하세요.' value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown}></input>
                <button className='searchBtn' onClick={handleSearch}>검색</button>
            </div>
                {searchPerformed && <p>"{activeSearchTerm}" 검색 결과입니다.</p>}
                

            <CoffeeList category={category} searchTerm={activeSearchTerm} searchTriggered={searchPerformed}/>
        </div>
    );
}

export default CoffeeMenu;
