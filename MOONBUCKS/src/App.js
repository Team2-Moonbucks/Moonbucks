import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';


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

import UserModify from './pages/UserModify';
import UserDetail from './pages/MyMoonBucks';

// import Mymoonbu
import BoardPage from './pages/BoardPage';
import BoardRegist from './pages/BoardRegist';
import BoardDetail from './pages/BoardDetail';
import BoardModify from './pages/BoardModify';


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
					<Route path="board" >
						<Route index element={<BoardPage />} />
						<Route path=":id" element={<BoardDetail />} />
						<Route path="regist" element={<BoardRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<BoardModify />} />
						</Route>
					</Route>

					<Route path="mymoonbucks">
						<Route index element={<UserDetail />} />
						<Route path="modify" >
							<Route index element={<UserModify />} />
						</Route>
						
					</Route>


				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
