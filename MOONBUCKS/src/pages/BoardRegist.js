import React, { useState } from 'react';
import BoardRegistForm from '../components/form/BoardRegistForm';

function BoardRegist() {
    const [postData, setPostData] = useState({
        title: '',
        content: ''
    });

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
    };

    return (
        <div className='pageTitle'>
            <h1>게시물 등록</h1>
            <hr/>
            <BoardRegistForm />
        </div>
    );
}

export default BoardRegist;
