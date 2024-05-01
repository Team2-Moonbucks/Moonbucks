import { Link, useNavigate  } from 'react-router-dom';


function Error() {

	const navigate = useNavigate()

	return (
		<div className='errorCSS'>
			<div className='ErrorImg'></div>
			<h1>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</h1>
			<h3>페이지의 주소가 잘못 입력되었거나, <br/> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.</h3>
			<Link to={'/'}>
				<span className='toMain'>메인으로</span>
			</Link>
				<span onClick={() => {navigate(-1);}} className='toBack'>이전으로</span>
		</div>
	);
}

export default Error;