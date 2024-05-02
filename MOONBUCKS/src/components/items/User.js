import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetUserAPI } from '../../apis/UserAPICalls';

function User({ id }) {

	const result = useSelector(state => state.userReducer);
	const user = result.user;
	const dispatch = useDispatch();

	console.log('id : ', id);

	useEffect(
		() => {
			/* user 호출 API */
			dispatch(callGetUserAPI(id));
		},
		[]
	);



	return (
		user && (
			<div className='DetailBox'>
				<table>
					<tbody>
						<tr>
							<td><span>아이디</span>|</td>
							<td>{user.id}</td>
						</tr>
						<tr>
							<td><span>닉네임</span>|</td>
							<td>{user.nickname}</td>
						</tr>
						<tr>
							<td><span>Email</span>|</td>
							<td>{user.email}</td>
						</tr>
					</tbody>					
				</table>
			</div>
		)
	);
}

export default User;