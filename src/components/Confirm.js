import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, Modal, StyleSheet } from 'react-native'
import Button from './Button';

const Confirm = ({ children, onAccept, onDecline, visible }) => {
	const { viewContainer, textStyle, containerStyle } = styles;
	return (
		<Modal
			animationType="slide"
			onRequestClose={() => {}}
			transparent
			visible={visible}
		>
			<View style={containerStyle}>
				<View style={viewContainer}>
					<AntDesign name="delete" size={100} />
				</View>
				<View style={viewContainer}>
					<Text style={textStyle}>{ children }</Text>
				</View>
				<View style={viewContainer}>
					<Button btncolor="#ff0000" onPress={onDecline}>
						Cancel
					</Button>
					<Button btncolor="#33ccff" onPress={onAccept}>
						Okay
					</Button>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	viewContainer: {
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 20,
		justifyContent: 'center',
		flexDirection: 'row',
		position: 'relative'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		position: 'relative',
		flex: 1,
		margin: 10,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#eee",
		marginTop: 350,
		justifyContent: 'flex-end',
		height: "auto",
		alignContent: "center",
		backgroundColor: "#fff"
	}
});

export default Confirm;