import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
	return (
		<TouchableOpacity onPress={props.onPress} style={[styles.buttonStyle,{borderColor: props.btncolor ? props.btncolor : "#33ccff"}]}>
			<Text style={[styles.buttonText,{color: props.btncolor ? props.btncolor : "#33ccff"}]}>
				{props.children}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderRadius: 50,
		borderWidth: 1,
		marginHorizontal: 5
	},
	buttonText: {
		fontSize: 20,
		alignSelf: 'center',
		paddingVertical: 10,
	}
});

export default Button;