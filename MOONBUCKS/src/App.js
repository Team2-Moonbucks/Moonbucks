import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Menus from './pages/Menus';
import MenuDetail from './pages/MenuDetail';
import MenuRegist from './pages/MenuRegist';
import MenuModify from './pages/MenuModify';
import Login from './pages/Login';
import Error from './pages/Error';
import BoardPage from './pages/BoardPage';
import BoardRegist from './pages/BoardRegist';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardList from './components/lists/BoardList';
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
					<Route path="menu" >
						<Route index element={<Menus />} />
						<Route path=":id" element={<MenuDetail />} />
						<Route path="regist" element={<MenuRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<MenuModify />} />
						</Route>
					</Route>
					<Route path="login" element={<Login />} />
					<Route path="main" element={<Main />} />

					<Route path="board" >
						<Route index element={<BoardPage />} />
						<Route path=":id" element={<BoardDetail />} />
						<Route path="regist" element={<BoardRegist />} />
						<Route path="modify" >
							<Route path=":id" element={<BoardModify />} />
						</Route>
					</Route>

				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
