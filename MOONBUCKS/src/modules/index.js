import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import shopReducer from "./ShopModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	shopReducer
});

export default rootReducer;