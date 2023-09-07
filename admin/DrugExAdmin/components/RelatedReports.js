import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ReportCard from "./ReportCard";
import colors from "../assets/colors";

const RelatedReports = ({ reportId }) => {
	const [relatedReports, setRelatedReports] = useState([]);
	const domain = "http://192.168.29.45:8000/";

	useEffect(() => {
		fetch(domain + "reports/get-related-reports?reportId=" + reportId)
			.then((res) => res.json())
			.then((data) => setRelatedReports(data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<View style={styles.container}>
			{relatedReports.length == 0 ? (
				<View style={styles.valueField}>
					<Text
						selectable={true}
						style={{
							color: "red",
							fontSize: 18,
							margin: 10,
							textAlign: "center",
						}}
					>
						None
					</Text>
				</View>
			) : (
				<Text></Text>
			)}
			{relatedReports.map((report) => {
				if (report.report_id === reportId) return <View />;
				return <ReportCard key={report.report_id} report={report} />;
			})}
		</View>
	);
};

export default RelatedReports;

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
	valueField: {
		backgroundColor: "#D2D2D2",
		marginHorizontal: 10,
		borderRadius: 5,
	},
});
