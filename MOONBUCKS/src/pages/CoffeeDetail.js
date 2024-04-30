import Coffee from "../components/items/Coffee";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteCoffeeAPI } from '../apis/CoffeeAPICalls';

function CoffeeDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isLogin');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const result = useSelector(state => state.coffeeReducer);

	const updateHandler = () => navigate(`/coffee/modify/${id}`);
	const deleteHandler = () => dispatch(callDeleteCoffeeAPI(id));

	useEffect(
		() => {
			/* 메뉴 삭제 완료 확인 후 /coffee로 이동 */
			if (result.delete) {
				alert('메뉴 삭제');
				navigate(`/coffee`);
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<div>
			<h1>메뉴 상세</h1>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isAuthorized) &&
					<>
						<button onClick={updateHandler}>메뉴 수정</button>
						<button onClick={deleteHandler}>메뉴 삭제</button>
					</>
				}
			</h1>
			<Coffee id={id} />
		</div>
	);
}

export default CoffeeDetail;