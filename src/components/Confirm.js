import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native'
import Button from './Button';
import CardSection from './CardSection';

const Confirm = ({ children, onAccept, onDecline, visible }) => {
	const { cardSectionStyle, textStyle, containerStyle } = styles;
	return (
		<Modal
			animationType="fade"
			onRequestClose={() => {}}
			transparent
			visible={visible}
		>
			<View style={containerStyle}>
				<CardSection style={cardSectionStyle}>
					<Text style={textStyle}>{ children }</Text>
				</CardSection>
				<CardSection style={cardSectionStyle}>
					<Button btncolor="#ff0000" onPress={onDecline}>
						Cancel
					</Button>
					<Button btncolor="#33ccff" onPress={onAccept}>
						Okay
					</Button>
				</CardSection>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 15
	}
});

export default Confirm;