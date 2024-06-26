import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';

function Main() {

	const navigate = useNavigate();

	return (
		<Container>
			{/* <h1>Main</h1> */}
			<div className="mainCSS d-block d-lg-none">
				<span><img src="../dessert_mini.svg"></img></span>
				<button onClick={() => navigate(`/dessert`)}>Detail More</button>
			</div>
			<div className="mainCSS d-none d-lg-block">
				<span><img src="../dessert_main.svg"></img></span>
				<button onClick={() => navigate(`/dessert`)}>Detail More</button>
			</div>
			<div className="coffeeMain mainCSS d-block d-lg-none">
				<span><img src="../coffee_mini.svg"></img></span>
				<button onClick={() => navigate(`/menu`)}>Detail More</button>
			</div>
			<div className="coffeeMain mainCSS d-none d-lg-block">
				<span><img src="../coffee_main.svg"></img></span>
				<button onClick={() => navigate(`/coffee`)}>Detail More</button>
			</div>
		</Container>
	);
}

export default Main;