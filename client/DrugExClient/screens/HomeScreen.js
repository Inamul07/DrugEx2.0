import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../assets/color";

export default function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text>This is HomeScreen</Text>
			<Button
				title="Go to Report Screen"
				onPress={() => navigation.navigate("ReportScreen")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.primary,
	},
});
