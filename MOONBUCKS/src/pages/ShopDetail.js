import Shop from "../components/items/Shop";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteShopAPI } from '../apis/ShopAPICalls';

function ShopDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isLogin');
	/* 관리자 로그인 상태 확인 */
	const isAdmin = !!localStorage.getItem('isAdmin');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const result = useSelector(state => state.shopReducer);

	const updateHandler = () => navigate(`/shop/modify/${id}`);
	const deleteHandler = () => dispatch(callDeleteShopAPI(id));

	useEffect(
		() => {
			/* 매장 삭제 완료 확인 후 /shop로 이동 */
			if (result.delete) {
				alert('매장 삭제');
				navigate(`/shop`);
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<div className="pageTitle">
			<h1>매장 상세</h1>
			<hr/>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isAdmin) &&
					<>
						<button className="modifyBtn" onClick={updateHandler}>매장 수정</button>
						<button className="deleteBtn" onClick={deleteHandler}>매장 삭제</button>
					</>
				}
			</h1>
			<Shop id={id} />
		</div>
	);
}

export default ShopDetail;