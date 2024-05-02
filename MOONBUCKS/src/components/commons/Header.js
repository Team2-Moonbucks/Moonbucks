import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ToTheTop from '../items/ToTheTop';

function Header() {

	const isAuthorized = !!localStorage.getItem('isLogin');
	const isUser = !!localStorage.getItem('isUser');
	const isAdmin = !!localStorage.getItem('isAdmin');
	const nickname = localStorage.getItem('LoginNickname');
	const navigate = useNavigate();
	const dispatch = useDispatch();


	console.log('isAdmin : ', isAdmin);
	console.log('isUser : ', isUser);

	/* 로그아웃 호출 시: localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동 */
	const logoutHandler = () => {
		localStorage.removeItem('LoginNickname');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('isUser');
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
					<Nav className="me-auto header-nav">
						<ul>
							{/* {!isAuthorized ? (
							<li><NavLink to='/login'>Login</NavLink></li>
							) : (
								<li onClick={logoutHandler}><a href="">LogOut</a></li>
							)
							}
							<li><NavLink to="/">Sign In</NavLink></li>
							<li><NavLink to="/">My Moonbucks</NavLink></li> */}

							{!isAdmin ? (
								!isUser ? (
									<>
										<li><NavLink to='/login'>Login</NavLink></li>
										<li><NavLink to="/signIn">Sign In</NavLink></li>
									</>
								) : (
									<>
										<li><p><span>'{nickname}'</span>님 환영합니다</p></li>
										<li onClick={logoutHandler}><a href="">LogOut</a></li>
										<li><NavLink to="/mymoonbucks">My Moonbucks</NavLink></li>
									</>
								)
							) : (
								(
									<>
										<li><p>'{nickname}'님 환영합니다</p></li>
										<li onClick={logoutHandler}><a href="">LogOut</a></li>
									</>
								)
							)
							}
							
						</ul>
					</Nav>
				</Container>
			</Navbar>
			<ToTheTop/>
		</Container>
		
	);
}

export default Header;