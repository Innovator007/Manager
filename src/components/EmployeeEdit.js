import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ToastAndroid, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';
import { 
	employeeUpdate, 
	employeeChange, 
	employeeDelete 
} from '../actions/index';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Confirm from './Confirm';
import EmployeeForm from './EmployeeForm';
import Spinner from './Spinner';

class EmployeeEdit extends Component {
	state = { showModal: false, loading: false }
	componentWillMount() {
		_.each(this.props.employee, (value,prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	componentWillUnmount() {
		this.setState({ loading: false, showModal: false });
		this.resetreduxState()
	}

	onSaveBtnPress() {
		const { fullname, occupation, phone, shift } = this.props;

		this.setState({ loading: true });
		if(fullname === "" || occupation === "" || phone === "") {
			ToastAndroid.show(
				'All Fields are Required!',
				ToastAndroid.SHORT
			);
			this.setState({ loading: false });
		} else {
			this.props.employeeChange({ fullname, occupation, phone, shift, uid: this.props.employee.uid });
		}
	}

	onTextPress() {
		const { phone, shift } = this.props;
		Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}

	resetreduxState() {
		_.each(this.props.employee, (value,prop) => {
			this.props.employeeUpdate({ prop, value: '' });
		});
	}

	onModalAccept() {
		const { uid } = this.props.employee;
		this.props.employeeDelete({ uid });
		this.setState({ showModal: false });
		this.resetreduxState();
	}

	onModalDecline() {
		this.setState({ showModal: false });
	}

	renderButton() {
		if(this.state.loading) {
			return (
				<Spinner />
			)
		} else {
			return (
				<Button btncolor="#33ccff" onPress={this.onSaveBtnPress.bind(this)}>
					<AntDesign name="save" size={20} />
					Save Changes
				</Button>
			)
		}
	}

	render() {
		return (
		<ScrollView>
			<Card>
				
				<EmployeeForm { ...this.props } />
		        
		        <CardSection>
		          { this.renderButton() }
		        </CardSection>
		        
		        <CardSection>
		          <Button btncolor="#33ccff" onPress={this.onTextPress.bind(this)}>
			        <AntDesign name="message1" size={20} />
							Text Schedule
			      </Button>
		        </CardSection>
		        
		        <CardSection>
		          <Button btncolor="#ff0000" onPress={() => this.setState({ showModal: !this.state.showModal })}>
			        <AntDesign name="deleteuser" size={20} />
							Fire Employee
			      </Button>
		        </CardSection>

		        <Confirm 
		        	visible={this.state.showModal}
		        	onAccept={this.onModalAccept.bind(this)}
		        	onDecline={this.onModalDecline.bind(this)}
		        >
		        	Are you sure you want to fire them?
		        </Confirm>

	      	</Card>
		</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	const { fullname, occupation, phone, shift } = state.employee;

	return { fullname, occupation, phone, shift }
}

export default connect(mapStateToProps,{ 
	employeeUpdate, 
	employeeChange, 
	employeeDelete 
})(EmployeeEdit);