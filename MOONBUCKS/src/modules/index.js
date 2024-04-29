import { combineReducers } from "redux";
import userReducer from "./UserModule";
import menuReducer from "./MenuModule";
import boardReducer from "./BoardModule";


const rootReducer = combineReducers({
	userReducer,
	menuReducer,
	boardReducer
});

export default rootReducer;