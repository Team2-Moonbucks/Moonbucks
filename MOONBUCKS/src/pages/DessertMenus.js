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

	const handleCategoryChange = (category) => {
        setCategory(category);
        dispatch(callGetDessertListAPI(category));
    };


    useEffect(() => {
        dispatch(callGetDessertListAPI('전체보기'));
    }, [dispatch]);

    return (
        <div className="pageTitle dessertTitle">
            <h1> 디저트 {isAdmin && <button className='dessertRegistBtn' onClick={() => navigate(`/dessert/regist`)}>메뉴 추가</button>} </h1>
            <div>
                <button className={`${(category === '전체보기' ? 'active' : '')} TotalBtn` } onClick={() => handleCategoryChange('전체보기')}>전체보기</button>
                <button className={`${(category === '브레드' ? 'active' : '')} breadBtn` } onClick={() => handleCategoryChange('브레드')}>브레드</button>
                <button className={`${(category === '케이크' ? 'active' : '')} cakeBtn`} onClick={() => handleCategoryChange('케이크')}>케이크</button>
                <button className={`${(category === '샌드위치' ? 'active' : '')} sandwitchBtn`} onClick={() => handleCategoryChange('샌드위치')}>샌드위치</button>
            </div>
        
            <DessertList category={category}/>
        </div>
    );
}

export default DessertMenus;