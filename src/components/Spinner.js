import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
	return (
		<View style={styles.spinnerContainer}>
			<ActivityIndicator size={size || "large"} color="#33ccff" />
		</View>
	);
}

const styles = StyleSheet.create({
	spinnerContainer: {
		flex: 1,
		alignItems:'center',
		justifyContent: 'center'
	}
});

export default Spinner;