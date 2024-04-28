import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

	const isAuthorized = !!localStorage.getItem('isLogin');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/* 로그아웃 호출 시: localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동 */
	const logoutHandler = () => {
		localStorage.removeItem('isLogin');
		dispatch(resetLoginUser());
		navigate('/');
	}

	return (
		<Container>
			<Navbar expand="lg" className="bg-body-tertiary header">
				<Container>
					<div className="logo">			
						<NavLink to='/main'>
							<span><img src='/images/logo.png'/></span>
							<h1>MOONBUCKS</h1>
						</NavLink>
					</div>
					<Nav className="me-auto">
						<ul>
							{!isAuthorized ? (
							<li><NavLink to='/login'>Login</NavLink></li>
							) : (
								<li onClick={logoutHandler}><a href="">LogOut</a></li>
							)
							}
							{/* <NavLink to="/login">Login</NavLink> */}
							<li><NavLink to="/">Sign In</NavLink></li>
							<li><NavLink to="/">My Moonbucks</NavLink></li>
						</ul>
					</Nav>
				</Container>
			</Navbar>
		</Container>
		
	);
}

export default Header;