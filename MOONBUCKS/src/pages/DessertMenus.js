import React, { useState, useEffect } from 'react';
import DessertList from "../components/lists/DessertList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { callGetDessertListAPI } from '../apis/DessertAPICalls';



function DessertMenus() {

	// const isAuthorized = !!localStorage.getItem('isLogin');
	/* 관리자 로그인 상태 확인 */
	const isAdmin = localStorage.getItem('isAdmin');
	
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
    const [category, setCategory] = useState('전체보기');
    const [searchTerm, setSearchTerm] = useState('');  // 검색어 상태 추가

	const handleCategoryChange = (category) => {
        setCategory(category);
        dispatch(callGetDessertListAPI(category));
    };

    const handleSearch = () => {
        dispatch(callGetDessertListAPI(category, searchTerm));
    };

    // 페이지가 처음 렌더링될 때 전체보기 카테고리의 API를 호출
    useEffect(() => {
        dispatch(callGetDessertListAPI(category));
    }, [dispatch, category]); // 카테고리 변경 시에도 API 재호출

    return (
        <div className="pageTitle dessertTitle">
            <h1> 디저트 {isAdmin && <button className='dessertRegistBtn' onClick={() => navigate(`/dessert/regist`)}>메뉴 추가</button>} </h1>
            <div className='searchBox'>
				<input
					type="search"
					placeholder="검색어를 입력하세요."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button className='searchBtn' onClick={handleSearch} >검색</button>
			</div>
            <div>
                <button className={`${(category === '전체보기' ? 'active' : '')} TotalBtn` } onClick={() => handleCategoryChange('전체보기')}>전체보기</button>
                <button className={`${(category === '브레드' ? 'active' : '')} breadBtn` } onClick={() => handleCategoryChange('브레드')}>브레드</button>
                <button className={`${(category === '케이크' ? 'active' : '')} cakeBtn`} onClick={() => handleCategoryChange('케이크')}>케이크</button>
                <button className={`${(category === '샌드위치' ? 'active' : '')} sandwitchBtn`} onClick={() => handleCategoryChange('샌드위치')}>샌드위치</button>
            </div>
        
            <DessertList category={category} searchTerm={searchTerm}/>
        </div>
    );
}

export default DessertMenus;