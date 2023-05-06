import { View, Text, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import colors from "../assets/color";

const Modal = ({ setModal, keyPresent, userId, setUserId }) => {
	function randstr(prefix) {
		return Math.random()
			.toString(36)
			.replace("0.", prefix || "");
	}

	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("USER_ID", value);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.modalContainer}>
			{keyPresent && (
				<View style={{ flexDirection: "column", alignItems: "center" }}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: "#FFF",
						}}
					>
						Previous Chat Found
					</Text>
					<CustomButton
						title={"Load Previous Chat"}
						onPress={() => setModal(false)}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "bold",
							color: "#FFF",
						}}
					>
						OR
					</Text>
				</View>
			)}
			<CustomButton
				title="Load New Chat"
				onPress={() => {
					setUserId(randstr("id-"));
					storeData(userId);
					setModal(false);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
		position: "absolute",
		height: "100%",
		width: "100%",
	},
});

export default Modal;
