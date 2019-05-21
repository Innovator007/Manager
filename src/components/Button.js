import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

const Button = (props) => {
	return (
		<TouchableNativeFeedback onPress={props.onPress} background={TouchableNativeFeedback.SelectableBackground()}>
			<View style={[styles.buttonStyle,{backgroundColor: props.btncolor ? props.btncolor : "#33ccff"}]}>
				<Text style={[styles.buttonText,{color: props.btncolor !== "#fff" ? "#fff" : "#33ccff"}]}>
					{props.children}
				</Text>
			</View>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		borderRadius: 3,
		marginHorizontal: 5
	},
	buttonText: {
		fontSize: 20,
		alignSelf: 'center',
		paddingVertical: 10
	}
});

export default Button;