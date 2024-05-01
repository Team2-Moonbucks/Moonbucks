import BoardList from "../components/lists/BoardList";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function BoardPage() {

	const [title, setTitle] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
	// const isLogin = !!localStorage.getItem('isLogin');

	const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        setActiveSearchTerm(searchTerm);
        setSearchPerformed(true);
    };
	
	const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
			handleSearch();
            // 검색을 수행하는 함수를 호출
            // 예를 들어, navigate(`/search?term=${searchTerm}`);
        }
    };

	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
	const isUser = !!localStorage.getItem('isUser');

	const navigate = useNavigate();

	return (
		<div className="pageTitle">
			<h1>
				게시글 목록 
				{(isAdmin) && <button onClick={() => navigate(`/board/regist`)}>등록</button>}  
				{(isUser) && <button onClick={() => navigate(`/board/regist`)}>등록</button>}
			</h1>
			<hr/>
			<div className='searchBox'>
                <input type="search" placeholder='검색어를 입력하세요.' value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown}></input>
                <button className='searchBtn' onClick={handleSearch}>검색</button>
            </div>
                {searchPerformed && <p>"{activeSearchTerm}" 검색 결과입니다.</p>}
			<BoardList title={title} searchTerm={activeSearchTerm} searchTriggered={searchPerformed}/>
		</div>
	);
}



export default BoardPage;