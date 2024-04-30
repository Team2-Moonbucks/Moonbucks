import React, { useState, useEffect } from 'react';
import ShopList from "../components/lists/ShopList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { callGetShopListByCategoryAPI } from '../apis/ShopAPICalls';

function Shops() {

	const isAuthorized = !!localStorage.getItem('isLogin');

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [shopCategory, setShopCategory] = useState('전체보기');

	const handleCategoryChange = (shopCategory) => {
        setShopCategory(shopCategory);
        dispatch(callGetShopListByCategoryAPI(shopCategory));
    };

	useEffect(() => {
        dispatch(callGetShopListByCategoryAPI('전체보기'));
    }, [dispatch]);

	return (
		<div className="pageTitle shopTitle">
			<h1>매장 목록 {(isAdmin) && <button className='coffeeRegistBtn' onClick={() => navigate(`/shop/regist`)}>매장 추가</button>} </h1>
			<div>
                <button className={`${(shopCategory === '전체보기' ? 'active' : '')} TotalBtn` } onClick={() => handleCategoryChange('전체보기')}>전체보기</button>
                <button className={`${(shopCategory === '일반 매장' ? 'active' : '')} breadBtn` } onClick={() => handleCategoryChange('일반 매장')}>일반 매장</button>
                <button className={`${(shopCategory === 'DT 매장' ? 'active' : '')} cakeBtn`} onClick={() => handleCategoryChange('DT 매장')}>DT 매장</button>
                <button className={`${(shopCategory === '리저브 매장' ? 'active' : '')} sandwitchBtn`} onClick={() => handleCategoryChange('리저브 매장')}>리저브 매장</button>
            </div>
			<ShopList />
		</div>
	);
}

export default Shops;