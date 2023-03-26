import { View, Text, StyleSheet } from "react-native";

const ShortField = ({ tag, value }) => {
	return (
		<View style={styles.field}>
			<View style={{ width: "50%" }}>
				<Text style={styles.text}>{tag}:</Text>
			</View>
			<View style={styles.valueField}>
				<Text
					selectable={true}
					style={{ color: "#000", fontSize: 18, margin: 10 }}
				>
					{value}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		color: "#FFF",
	},
	valueField: {
		backgroundColor: "#D2D2D2",
		borderRadius: 5,
		width: "50%",
	},
	field: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 10,
		marginBottom: 10,
	},
});

export default ShortField;
