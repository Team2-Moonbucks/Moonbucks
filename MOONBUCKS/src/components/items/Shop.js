import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetShopAPI } from '../../apis/ShopAPICalls';

function Shop({ id }) {

	const result = useSelector(state => state.shopReducer);
	const shop = result.shop;
	const dispatch = useDispatch();

	useEffect(
		() => {
			/* shop 호출 API */
			dispatch(callGetShopAPI(id));
		},
		[]
	);

	return (
		shop && (
			<div className='DetailBox'>
				<table>
					<tbody>
						<tr>
							<td><span>이름</span>|</td>
							<td>{shop.shopName}</td>
						</tr>
						<tr>
							<td><span>주소</span>|</td>
							<td>{shop.shopAddr}</td>
						</tr>
						<tr>
							<td><span>연락처</span>|</td>
							<td>{shop.shopPhone}</td>
						</tr>
						<tr>
							<td><span>종류</span>|</td>
							<td>{shop.shopCategory ? shop.shopCategory : '일반 매장'}</td>
						</tr>
					</tbody>					
				</table>
			</div>
		)
	);
}

export default Shop;