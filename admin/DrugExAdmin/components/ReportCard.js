import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const ReportCard = ({ report }) => {
	const navigation = useNavigation();

	const handlePress = () => {
		navigation.navigate("Details", {
			report: report,
		});
	};

	return (
		<TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
			<View>
				<Text style={styles.text}>
					<Text style={{ fontWeight: "bold", color: "tomato" }}>
						Report Id:
					</Text>{" "}
					{report.report_id}
				</Text>
				<Text style={styles.text}>
					<Text style={{ fontWeight: "bold", color: "tomato" }}>
						Address:
					</Text>{" "}
					{report.address}
				</Text>
				<Text style={styles.text}>
					<Text style={{ fontWeight: "bold", color: "tomato" }}>
						City:
					</Text>{" "}
					{report.city}
				</Text>
				<View
					style={{
						borderWidth: 1,
						borderColor: "#D2D2D2",
						borderTopColor: "grey",
					}}
				/>
				<Text style={styles.text}>
					{new Date(report.report_time).toLocaleString()}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		height: "auto",
		backgroundColor: "#D2D2D2",
		padding: 10,
		borderRadius: 20,
		margin: 10,
	},
	text: {
		fontSize: 18,
		padding: 3,
	},
});

export default ReportCard;
