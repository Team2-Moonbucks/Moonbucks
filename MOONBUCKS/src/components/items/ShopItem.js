import { Link } from 'react-router-dom';

function ShopItem({ shop }) {

	return (
		<Link to={`/shop/${shop.id}`}>
			<div className="shopItem TotalItem">
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
				{/* <h3><span>이름</span>| {shop.shopName}</h3>
				<h3><span>주소</span>| {shop.shopAddr}</h3>
				<h3><span>연락처</span>| {shop.shopPhone}</h3>
				<h4><span>종류</span>| {shop.shopCategory}</h4> */}
			</div>
		</Link>
	);
}

export default ShopItem;