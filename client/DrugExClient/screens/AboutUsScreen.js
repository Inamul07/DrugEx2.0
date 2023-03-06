import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../assets/color";

export default function AboutScreen() {
	return (
		<ImageBackground
			style={styles.container}
			source={require("../assets/aboutus-image.png")}
			resizeMode="contain"
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.header,
		alignItems: "center",
		justifyContent: "center",
	},
});
