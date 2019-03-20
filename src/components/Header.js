import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = (props) => {
	return (
		<View style={styles.headercontainer}>
			<Text style={styles.headercontent}>{ props.title }</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	headercontainer: {
		backgroundColor: '#33ccff',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		position: 'relative'
	},
	headercontent: {
		fontSize: 25,
		color: '#fff',
		fontWeight: 'bold'
	}
});

export default Header;