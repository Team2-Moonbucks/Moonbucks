import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import shopReducer from "./ShopModule";
import coffeeReducer from "./CoffeeModule";
import dessertReducer from "./DessertModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	shopReducer,
	coffeeReducer,
	dessertReducer
});

export default rootReducer;