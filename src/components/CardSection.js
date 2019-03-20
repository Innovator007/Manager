import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={styles.cardSectionContainer}>
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	cardSectionContainer: {
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		position: 'relative'
	}
});



export default CardSection;