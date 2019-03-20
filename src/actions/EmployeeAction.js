import { 
	EMPLOYEE_UPDATE, 
	EMPLOYEE_CREATE, 
	EMPLOYEE_FETCH_SUCCESS, 
	EMPLOYEE_CHANGE 
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop,value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop,value }
	};
};

export const employeeCreate = ({ fullname,occupation,phone,shift }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
		    .push({ fullname, occupation, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE })
				Actions.pop();
			});
	};	
};

export const employeeFetch = () => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on("value",snapshot => {
				dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const employeeChange = ({ fullname, occupation, phone, shift, uid }) => {
	const { currentUser } = firebase.auth();
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ fullname, occupation, phone, shift })
			.then(() => {
				dispatch({ type: EMPLOYEE_CHANGE });
				Actions.main();
			});
	}
}

export const employeeDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();
	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
				Actions.main();
			});
	}
}