import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callGetDessertAPI, callRegistDessertAPI } from '../../apis/DessertAPICalls';

function DessertRegistForm() {
    const result = useSelector(state => state.dessertReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthorized = !!localStorage.getItem('isLogin');
    const isAdmin = !!localStorage.getItem('isAdmin');
    const [registDessert, setRegistDessert] = useState({
        id: '0',
        menuName: '',
        menuPrice: 0,
        categoryName: '브레드',
        detail: {
            description: '',
            image: ''
        }
    });

	useEffect(() => {
        const fetchLastId = async () => {
            const response = await fetch('http://localhost:4000/dessert');
            const desserts = await response.json();
            const lastId = Math.max(...desserts.map(item => parseInt(item.id, 10)))+1;
            setRegistDessert(prevState => ({ ...prevState, id : lastId.toString() })); // ID를 문자열로 변환하여 저장
        };
        fetchLastId();
    }, []);

    // 권한 검증과 리다이렉트
    useEffect(() => {
        if (!isAuthorized || !isAdmin) {
            navigate('/login');
        }
    }, [isAuthorized, isAdmin, navigate]);

    useEffect(() => {
        if (result.regist) {
            alert('메뉴 등록');
            navigate(`/dessert`);
        }
    }, [result, navigate]);

    const onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case 'menuPrice':
                value = parseInt(value);
                break;
            case 'description':
                name = 'detail';
                value = {
                    description: value,
                    image: registDessert.detail.image
                };
                break;
            default:
                break;
        }
        setRegistDessert({
            ...registDessert,
            [name]: value
        });
    };

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setRegistDessert({
            ...registDessert,
            detail: {
                description: registDessert.detail.description,
                image: base64
            }
        });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

   

    const onClickHandler = () => {
		/* registMenu에 대한 유효성 검사 후 호출 */
		dispatch(callRegistDessertAPI(registDessert));
	}

    return (
        <div className = 'formTotal'>
            <label>메뉴 이름</label><br/>
            <input type="text" name="menuName" value={registDessert.menuName} onChange={onChangeHandler} />
            <br/>
            <label>메뉴 가격</label><br/>
            <input type="number" name="menuPrice" value={registDessert.menuPrice} onChange={onChangeHandler} />
            <br />
            <label>카테고리</label><br/>
            <select name="categoryName" value={registDessert.categoryName} onChange={onChangeHandler}>
                <option>브레드</option>
                <option>케이크</option>
                <option>샌드위치</option>
            </select>
            <br />
            <label>설명</label><br/>
            <textarea name="description" value={registDessert.detail.description} onChange={onChangeHandler}></textarea>
            <br />
            <label>사진</label><br/>
            <input
                type="file"
                name="image"
                accept='image/*'
                onChange={fileChangeHandler} />
            <br/>
            <button onClick={onClickHandler}>메뉴 등록</button>
        </div>
    );
}

export default DessertRegistForm;
