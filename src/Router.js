import React, { Component } from 'react';
import firebase from 'firebase';
import { Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

class RouterComponent extends Component {
	componentDidMount() {
	    firebase.auth().onAuthStateChanged(user => {
	      if(user) {
	      	if(Actions.currentScene == "login") {
	      		Alert.alert(
		          'Continue Logged In',
		          'Do you want to continue with ' + user.email + '?', [{
		              text: 'Cancel',
		              onPress: () => console.log('Cancel Pressed'),
		              style: 'cancel'
		          }, {
		              text: 'OK',
		              onPress: () => Actions.main()
		          }, ], {
		              cancelable: false
		          }
		      )
	      	}
	      }
	    })
	}

	render() {
		return (
			<Router {...sceneConfig} navBarButtonColor="#fff" navigationBarStyle={{ backgroundColor: '#33ccff' }}>
				<Stack key="root" hideNavBar>
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
								Alert.alert(
						          'Log Out',
						          'Do you want to logout of Manager', [{
						              text: 'Cancel',
						              onPress: () => console.log('Cancel Pressed'),
						              style: 'cancel'
						          }, {
						              text: 'OK',
						              onPress: () => {
						              	firebase.auth().signOut()
										Actions.auth()
						              }
						          }, ], {
						              cancelable: false
						          }
							    )
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
				</Stack>
			</Router>
		);
	}
};

var sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  }
}

export default RouterComponent;