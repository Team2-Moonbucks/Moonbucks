import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import coffeeReducer from "./CoffeeModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	coffeeReducer
});

export default rootReducer;