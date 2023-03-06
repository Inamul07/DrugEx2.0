import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../assets/color";
import CustomButton from "../components/CustomButton";

export default function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={{ color: "#FFF" }}>This is HomeScreen</Text>
			<CustomButton
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
