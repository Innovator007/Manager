import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardSection from './CardSection';

const Card = (props) => {
	return (
		<View style={styles.cardContainer}>
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		marginHorizontal: 5,
		marginTop: 10
	}
});

export default Card;