import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {ToastAndroid,Vibration} from 'react-native';
import { connect } from 'react-redux';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import EmployeeForm from './EmployeeForm';
import { employeeCreate } from '../actions/index';
import Spinner from './Spinner';

class EmployeeCreate extends Component {
	
	state = { loading: false }

	OnButtonPress = () => {
		const { fullname,occupation,phone,shift } = this.props;
		this.setState({ loading: true });
		if(fullname === "" || occupation === "" || phone === "") {
			ToastAndroid.show(
				'All Fields are required!',
				ToastAndroid.SHORT
			);
			Vibration.vibrate(100);
			this.setState({ loading: false });
		} else {
			this.props.employeeCreate({ fullname,occupation,phone,shift: shift || 'Monday' });
		}
	}

	renderButton() {
		if(this.state.loading) {
			return (
				<Spinner />
			)
		} else {
			return (
				<Button btncolor="#33ccff" onPress={this.OnButtonPress.bind(this)}>
					<AntDesign name="save" size={20} />
					Save
				</Button>
			)
		}
	}

	render() {
		return (
			<Card>
				<EmployeeForm { ...this.props } />
				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { fullname,occupation,phone,shift } = state.employee;
	return { fullname,occupation,phone,shift };
}

export default connect(mapStateToProps,{ employeeCreate })(EmployeeCreate);