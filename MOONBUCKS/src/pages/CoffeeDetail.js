import Coffee from "../components/items/Coffee";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteCoffeeAPI } from '../apis/CoffeeAPICalls';
import Swal from "sweetalert2";


function CoffeeDetail() {

	/* 로그인 상태 확인 */
	const isAuthorized = !!localStorage.getItem('isAdmin');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const result = useSelector(state => state.coffeeReducer);

	const updateHandler = () => navigate(`/coffee/modify/${id}`);
	const deleteHandler = () => {
		Swal.fire({
			title: "메뉴를 삭제하겠습니까?",
			text: "삭제 후 되돌릴 수 없습니다.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#1A264B",
			cancelButtonColor: "#d33",
			confirmButtonText: "삭제",
			cancelButtonText: "취소"
			}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
				title: "삭제 완료!",
				text: "메뉴가 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
				});
				dispatch(callDeleteCoffeeAPI(id));
			}
		});
	}

	useEffect(
		() => {
			/* 메뉴 삭제 완료 확인 후 /coffee로 이동 */
			if (result.delete) {
				navigate(`/coffee`);
			}
		}, // eslint-disable-next-line
		[result]
	);

	return (
		<div className="pageTitle">
			<h1>메뉴 상세</h1>
			<hr/>
			<h1>
				{ /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
				{(isAuthorized) &&
					<>
						<button className="modifyBtn" onClick={updateHandler}>메뉴 수정</button>
						<button className="deleteBtn" onClick={deleteHandler}>메뉴 삭제</button>
					</>
				}
			</h1>
			<Coffee id={id} />
		</div>
	);
}

export default CoffeeDetail;