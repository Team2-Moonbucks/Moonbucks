import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import shopReducer from "./ShopModule";
import coffeeReducer from "./CoffeeModule";
import dessertReducer from "./DessertModule";
import boardReducer from "./BoardModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	shopReducer,
	coffeeReducer,
	dessertReducer,
	boardReducer
});

export default rootReducer;