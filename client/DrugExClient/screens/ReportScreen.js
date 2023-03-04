import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ReportScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>This is ReportScreen</Text>
			<Button
				title="Go to Appreciation Screen"
				onPress={() => navigation.replace("AppreciationScreen")}
			/>
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
