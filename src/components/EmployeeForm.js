import React, { Component } from 'react';
import { TextInput, View, Text, Picker, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions/index';
import CardSection from './CardSection';

class EmployeeForm extends Component {
	render() {
		return (
			<View>
				<CardSection>
		            <TextInput 
		            onChangeText={value=> this.props.employeeUpdate({ prop:"fullname",value})}
		            style={styles.inputStyle} 
		            placeholder="John Doe" 
		            keyboardType="email-address"
		            value={this.props.fullname}
		            />
		        </CardSection>

		        <CardSection>
		          <TextInput 
		          onChangeText={value=> this.props.employeeUpdate({ prop:"occupation",value })}
		          style={styles.inputStyle} 
		          placeholder="Occupation i.e. Software Developer"
		          value={this.props.occupation} 
		          />
		        </CardSection>

		        <CardSection>
		          <TextInput 
		          onChangeText={value=> this.props.employeeUpdate({ prop:"phone",value })}
		          style={styles.inputStyle}
		          placeholder="Phone i.e 5555555555" 
							value={this.props.phone}
							keyboardType="number-pad"
		          />
		        </CardSection>
		        <View style={{marginLeft: 10}}>
		        	<Text style={{fontSize: 16}}>Employee Shift</Text>
		        </View>
		        <CardSection>
		        	<Picker
		        		style={{ flex: 1 }}
		        		selectedValue={this.props.shift}
		        		onValueChange={value=> this.props.employeeUpdate({ prop:"shift",value })}
		        	>
		        		<Picker.Item label="Monday" value="Monday" />
		        		<Picker.Item label="Tuesday" value="Tuesday" />
		        		<Picker.Item label="Wednesday" value="Wednesday" />
		        		<Picker.Item label="Thursday" value="Thursday" />
		        		<Picker.Item label="Friday" value="Friday" />
		        		<Picker.Item label="Saturday" value="Saturday" />
		        		<Picker.Item label="Sunday" value="Sunday" />
		        	</Picker>
		        </CardSection>
			</View>
		);	
	}
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    flexDirection:'row',
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#33ccff', 
    margin: 5,
    padding: 10,
    fontSize: 16
  }
});

const mapStateToProps = (state) => {
	const { fullname,occupation,phone,shift } = state.employee;
	return { fullname,occupation,phone,shift };
}

export default connect(mapStateToProps,{ employeeUpdate })(EmployeeForm);