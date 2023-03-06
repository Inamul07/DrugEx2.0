import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../assets/color";
import CustomButton from "../components/CustomButton";

export default function AppreciationScreen() {
	const navigation = useNavigation();

	return (
		<ImageBackground
			style={styles.container}
			source={require("../assets/appreciation-image.png")}
			resizeMode="cover"
		>
			<View style={{ position: "absolute", bottom: 225, width: "50%" }}>
				<CustomButton
					title={"Go to Home"}
					onPress={() => navigation.popToTop()}
				/>
			</View>
		</ImageBackground>
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
