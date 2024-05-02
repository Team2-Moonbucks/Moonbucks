import Shop from "../components/items/Shop";
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { callDeleteShopAPI } from '../apis/ShopAPICalls';
import Swal from "sweetalert2";


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
	const deleteHandler = () => {
		Swal.fire({
			title: "매장을 삭제하겠습니까?",
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
				text: "매장이 삭제되었습니다",
				icon: "success",
				showConfirmButton: false,
				timer: 1000
				});
				dispatch(callDeleteShopAPI(id));
			}
		});
	}

	useEffect(
		() => {
			/* 매장 삭제 완료 확인 후 /shop로 이동 */
			if (result.delete) {
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