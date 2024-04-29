import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import shopReducer from "./ShopModule";
import coffeeReducer from "./CoffeeModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	shopReducer,
	coffeeReducer
});

export default rootReducer;