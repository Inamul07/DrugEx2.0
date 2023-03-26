import { View, Text, StyleSheet } from "react-native";

const Field = ({ tag, value }) => {
	return (
		<View style={{ flexDirection: "column" }}>
			<Text style={{ color: "#FFF", fontSize: 18, margin: 10 }}>
				{tag}:
			</Text>
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
	valueField: {
		backgroundColor: "#D2D2D2",
		marginHorizontal: 10,
		borderRadius: 5,
	},
});

export default Field;
