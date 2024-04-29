import React, { useState, useEffect } from 'react';
import CoffeeList from "../components/lists/CoffeeList";
import { useNavigate } from "react-router-dom";

function CoffeeMenu() {
    const [category, setCategory] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [user, setUser] = useState(null); // 사용자 상태 추가
    
    const isAuthorized = !!localStorage.getItem('isLogin');
    
	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
    
    const navigate = useNavigate();

    useEffect(() => {
        // 여기에서 사용자 인증 로직을 구현하거나, 사용자 정보를 불러옵니다.
        // 예시에서는 하드코딩된 값으로 시뮬레이션합니다.
        setUser({
            id: "user01",
            password: "pass01",
            nickname: "핑크왕자",
            role: "user"
        });
    }, []);

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
        setActiveSearchTerm(searchTerm);
        setSearchPerformed(true);
    };

    const buttonStyle = (cat) => ({
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: category === cat ? 'magenta' : '#f8f9fa',
        color: category === cat ? 'white' : 'black',
        fontWeight: category === cat ? 'bold' : 'normal'
    });

    return (
        <div>
            <h1>분류 보기 {(isAdmin) && <button onClick={() => navigate(`/coffee/regist`)}>메뉴 추가</button>}</h1>
            <button style={buttonStyle('전체')} onClick={() => handleCategoryChange('전체')}>전체보기</button>
            <button style={buttonStyle('커피')} onClick={() => handleCategoryChange('커피')}>커피</button>
            <button style={buttonStyle('차')} onClick={() => handleCategoryChange('차')}>티</button>
            <button style={buttonStyle('블렌디드')} onClick={() => handleCategoryChange('블렌디드')}>블렌디드</button>
            <input type="search" placeholder='검색어를 입력하세요.' value={searchTerm} onChange={handleSearchChange}></input>
            <button onClick={handleSearch}>검색</button>

            {searchPerformed && <p>"{activeSearchTerm}" 검색 결과입니다.</p>}
            <CoffeeList category={category} searchTerm={activeSearchTerm} searchTriggered={searchPerformed} />
        </div>
    );
}

export default CoffeeMenu;
