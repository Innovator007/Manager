import React from 'react';
import firebase from 'firebase';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {

	return (
		<Router {...sceneConfig} navBarButtonColor="#fff" navigationBarStyle={{ backgroundColor: '#33ccff' }}>
			<Scene key="root" hideNavBar>
				<Scene key="auth">
					<Scene 
						key="login" 
						component={LoginForm} 
						title="Manager Login" 
						titleStyle={{flex:1,textAlign:'center',color:'#fff'}} 
						initial
					/>
				</Scene>
				<Scene key="main">
					<Scene	
						leftTitle={<AntDesign name="logout" size={25} />}
						onLeft={() => {
							firebase.auth().signOut()
							Actions.auth()
						}}
						rightTitle={<AntDesign name="adduser" size={25} />}
						onRight={() => Actions.employeeCreate() }
						key="employeeList"
						component={EmployeeList}
						title="Employees"
						titleStyle={{flex:1,textAlign:'center',color:'#fff'}} 
					/>
					<Scene	
						key="employeeCreate"
						component={EmployeeCreate}
						title='Add Employee'
						titleStyle={{flex:1,textAlign:'left',color:'#fff'}} 
						sceneStyle={{justifyContent:'flex-end'}}
						leftButtonIconStyle={{ tintColor: '#fff' }}
					/>
					<Scene	
						key="employeeEdit"
						component={EmployeeEdit}
						title='Edit Employee'
						titleStyle={{flex:1,textAlign:'left',color:'#fff'}} 
						sceneStyle={{justifyContent:'flex-end'}}
						leftButtonIconStyle={{ tintColor: '#fff' }}
					/>
				</Scene>	
			</Scene>
		</Router>
	);
};

var sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  }
}

export default RouterComponent;