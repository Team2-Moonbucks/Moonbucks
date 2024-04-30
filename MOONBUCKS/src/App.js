import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Menus from './pages/Menus';
import MenuDetail from './pages/MenuDetail';
import MenuRegist from './pages/MenuRegist';
import MenuModify from './pages/MenuModify';




import Login from './pages/Login';
import Error from './pages/Error';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Shops from './pages/Shops';
import ShopDetail from './pages/ShopDetail';
import ShopRegist from './pages/ShopRegist';
import ShopModify from './pages/ShopModify';


import CoffeeMenu from './pages/CoffeeMenu';
import CoffeeDetail from './pages/CoffeeDetail';
import CoffeeRegist from './pages/CoffeeRegist';
import CoffeeModify from './pages/CoffeeModify';
import SignIn from './pages/SignIn';

import DessertMenus from './pages/DessertMenus';
import DessertDetail from './pages/DessertDetail';
import DessertRegist from './pages/DessertRegist';
import DessertModify from './pages/DessertModify';


/* 추가 설치해야 하는 패키지 목록
 * react-router-dom
 * redux
 * react-redux
 * redux-actions
 * redux-thunk
 * redux-logger
 * redux-devtools-extension
 */

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />


					<Route path="menu" >
						<Route index element={<Menus />} />
						<Route path="*" element={<Error />} />
						<Route path=":id" element={<MenuDetail />} />
						<Route path="regist" element={<MenuRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<MenuModify />} />
						</Route>
					</Route>


					<Route path="login" element={<Login />} />
					<Route path="main" element={<Main />} />
					<Route path="signIn" element={<SignIn />} />


					{/* shop route */}
					<Route path="shop" >
						<Route index element={<Shops />} />
						<Route path=":id" element={<ShopDetail />} />
						<Route path="regist" element={<ShopRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<ShopModify />} />
						</Route>
					</Route>

					<Route path="coffee" >
						<Route path="*" element={<Error />} />
						<Route index element={<CoffeeMenu />} />
						<Route path=":id" element={<CoffeeDetail />} />
						<Route path="regist" element={<CoffeeRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<CoffeeModify />} />
						</Route>
					</Route>
					<Route path="dessert" >
						<Route index element={<DessertMenus />} />
						<Route path=":id" element={<DessertDetail />} />
						<Route path="regist" element={<DessertRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<DessertModify />} />
						</Route>
					</Route>


				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
