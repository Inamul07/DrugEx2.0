import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	RefreshControl,
} from "react-native";
import colors from "../assets/colors";
import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";

const ListScreen = ({ navigation }) => {
	// TODO: Change Domain Regularly For Different WIFI.
	const domain = "http://192.168.29.45:8000/";
	// const domain = "http://192.168.29.45:8000/";
	const [reports, setReports] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	var reportCards = [];

	useEffect(() => {
		fetchAllReports();
	}, []);

	const fetchAllReports = () => {
		setRefreshing(true);
		fetch(domain + "reports/get-all-reports")
			.then((res) => res.json())
			.then((data) => setReports(data))
			.catch((err) => console.log(err))
			.finally(() => setRefreshing(false));
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{
				alignItems: "center",
				justifyContent: "center",
			}}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={fetchAllReports}
				/>
			}
		>
			<Text style={styles.text}>
				Total Reports:{" "}
				<Text style={{ color: "tomato", fontSize: 24 }}>
					{reports.length}
				</Text>
			</Text>
			<View style={styles.reportsContainer}>
				{reports.map((report) => (
					<ReportCard report={report} key={report.report_id} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		padding: 10,
	},
	reportsContainer: {
		width: "100%",
		padding: 10,
		marginBottom: 50,
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFF",
		textAlign: "left",
		alignSelf: "flex-start",
		margin: 20,
	},
});

export default ListScreen;
