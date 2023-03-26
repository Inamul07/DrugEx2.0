import { ScrollView } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors";
import Field from "../components/Field";
import ShortField from "../components/ShortField";

const DetailsScreen = ({ route }) => {
	const { report } = route.params;

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{
				alignItems: "center",
			}}
		>
			<View style={styles.row}>
				<View style={{ width: "50%" }}>
					<Field tag={"Report Id"} value={report.report_id} />
				</View>
				<View
					style={{
						width: "50%",
					}}
				>
					<Field tag={"Incident Date"} value={report.incident_date} />
				</View>
			</View>
			<View style={styles.single}>
				<Field
					tag={"Incident Description"}
					value={report.incident_description}
				/>
			</View>
			<View style={styles.single}>
				<Field tag={"Address"} value={report.address} />
			</View>
			<View style={styles.single}>
				<Field tag={"Appearance"} value={report.appearance} />
			</View>
			<View style={styles.row}>
				<View style={{ width: "50%" }}>
					<Field tag={"City"} value={report.city} />
				</View>
				<View style={{ width: "50%" }}>
					<Field tag={"Gender"} value={report.gender} />
				</View>
			</View>
			<Text style={styles.text}>Extra Information:</Text>
			<ShortField
				tag={"Reported Time"}
				value={new Date(report.report_time).toLocaleString()}
			/>
			{report.trafficking_type !== null && (
				<ShortField
					tag={"Trafficking Type"}
					value={report.trafficking_type}
				/>
			)}
			{report.transport_method !== null && (
				<ShortField
					tag={"Transport Method"}
					value={report.transport_method}
				/>
			)}
			{report.approxAge !== null && (
				<ShortField tag={"Approx Age"} value={report.approxAge} />
			)}
			{report.otherInfo !== null && (
				<ShortField tag={"Other Info"} value={report.otherInfo} />
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		padding: 10,
	},
	text: {
		fontSize: 18,
		color: "#FFF",
		alignSelf: "flex-start",
		margin: 10,
		marginVertical: 20,
		fontSize: 20,
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-around",
	},
	single: {
		width: "100%",
		paddingVertical: 5,
	},
});

export default DetailsScreen;
