import { Outlet } from 'react-router-dom';
import Header from '../components/commons/Header';
import Navbars from '../components/commons/Navbar';
import Footer from '../components/commons/Footer';

function Layout() {

	return (
		<div>
			<Header />
			<Navbars />
			<Outlet />
			<Footer />
		</div>
	);
}

export default Layout;
