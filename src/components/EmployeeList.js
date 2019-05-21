import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, StyleSheet, BackHandler, Alert, TouchableNativeFeedback, View, ScrollView, Text } from 'react-native';
import firebase from 'firebase';
import Button from './Button';
import Spinner from './Spinner';
import { employeeFetch } from '../actions/index';

var backButtonPressedOnceToExit = false;

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeeFetch();
		this.createDataSource(this.props);
      	BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  	}

  componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
  	if(Actions.currentScene == "employeeList") {
  		Alert.alert(
          'Exit Application',
          'Do you really want to exit?', [{
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
          }, {
              text: 'OK',
              onPress: () => BackHandler.exitApp()
          }, ], {
              cancelable: false
          }
      )
      return true;
  	} else {
  		Actions.main();
  		return true;
  	}
  }

	componentWillReceiveProps(nextProps) {
		//nextProps are the next set of props this component will be rendered with
		//this.props is still the old set of props
		this.createDataSource(nextProps);
	}

	

	createDataSource({ employeeList }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1,r2) => r1 !== r2
		});
		this.dataSource = ds.cloneWithRows(employeeList);
	}

	render() {
		if(!this.props.employeeList) {
			return <Spinner />
		} else {
			return (
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={(employeeItem) => {
						return (
							<ScrollView style={{marginTop:5}}>
							<TouchableNativeFeedback onPress={()=> Actions.employeeEdit({ employee: employeeItem })}>
								<View style={styles.employeeContainer}>
									<Text style={styles.employeeNameStyle}>{employeeItem.fullname}</Text>
									<Text>{employeeItem.occupation} - {employeeItem.shift}</Text>
								</View>
							</TouchableNativeFeedback>
						</ScrollView>
						);
					}}
				/>
			);
		}
	}
}

const mapStateToProps = state => {
	const employee = _.map(state.employeeList, (val,uid) => {
		return { ...val,uid };
	});
	return { employeeList: employee };
};

const styles = StyleSheet.create({
	employeeContainer: {
		borderWidth: 1,
		borderColor: "#eee",
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 5,
		marginHorizontal: 10, 
		borderRadius: 10,
		backgroundColor: "#fff"
	},
	employeeNameStyle: {
		fontSize: 18,
		fontWeight: '600'
	}
});

export default connect(mapStateToProps,{ employeeFetch })(EmployeeList);