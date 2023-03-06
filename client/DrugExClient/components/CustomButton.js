import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../assets/color";

function CustomButton({ title, onPress }) {
	return (
		<TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
			<View>
				<Text style={styles.text}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default CustomButton;

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: colors.button,
		alignItems: "center",
		justifyContent: "center",
		padding: 15,
		borderRadius: 30,
		margin: 10,
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
});
