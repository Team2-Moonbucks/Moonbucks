import { NavLink, useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // React Router와 Bootstrap을 함께 사용할 때 필요한 모듈


function Navbars() {

	const activeStyle = {
		border: '3px solid #1A264B',
        color: 'red !important',
		borderRadius: '40px',
		lineHeight: '35px'
    }

	

	const isAuthorized = !!localStorage.getItem('isLogin');
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/* 로그아웃 호출 시: localStorage 저장 값 삭제, userReducer 값 리셋, 루트로 이동 */
	const logoutHandler = () => {
		localStorage.removeItem('isLogin');
		dispatch(resetLoginUser());
		navigate('/');
	}

	const isActive = (path) => {
        return location.pathname === path;
    };


	return (
		<Navbar expand="lg" className="bg-body-tertiary navbar">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginLeft: 'auto'}} />
				<Navbar.Collapse id="basic-navbar-nav" >
						<ul className='justify-content-center'>
							<Nav className="me-auto navbar-me-auto">
									<li><NavLink to='/main' style={({isActive}) => isActive? activeStyle : undefined}>Main</NavLink></li>
									<li><NavLink to='/Coffee' style={({isActive}) => isActive? activeStyle : undefined}>Coffee</NavLink></li>
									<li><NavLink to='/dessert' style={({isActive}) => isActive? activeStyle : undefined}>Dessert</NavLink></li>
									<li><NavLink to='/menu' style={({isActive}) => isActive? activeStyle : undefined}>Menu</NavLink></li>
									<li><NavLink to='/Shop' style={({isActive}) => isActive? activeStyle : undefined}>Shop</NavLink></li>
									<li><NavLink to='/Board' style={({isActive}) => isActive? activeStyle : undefined}>Board</NavLink></li>						
							</Nav>
						</ul>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navbars;