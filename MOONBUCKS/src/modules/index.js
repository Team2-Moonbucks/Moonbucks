import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import dessertReducer from "./DessertModule";

const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	dessertReducer
});

export default rootReducer;