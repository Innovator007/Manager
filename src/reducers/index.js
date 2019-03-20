import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import EmployeeReducer from './EmployeeReducer';
import EmployeeListReducer from './EmployeeListReducer';

export default combineReducers({
	auth: LoginReducer,
	employee: EmployeeReducer,
	employeeList: EmployeeListReducer
})