import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function AppreciationScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>This is AppreciationScreen</Text>
			<Button title="Go to Home" onPress={() => navigation.popToTop()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
