import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import colors from "../assets/colors";
import Field from "../components/Field";
import ShortField from "../components/ShortField";

const DetailsScreen = ({ route }) => {
	const { report } = route.params;

	const [loading, setLoading] = useState(false);

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
			{report.images !== null && (
				<View style={styles.single}>
					<View style={{ flexDirection: "column" }}>
						<Text
							style={{ color: "#FFF", fontSize: 18, margin: 10 }}
						>
							Images
						</Text>
						<ScrollView
							style={{ flexDirection: "row" }}
							horizontal={true}
						>
							{report.images.map((value, index) => {
								return (
									<View key={index}>
										<TouchableOpacity>
											<Image
												style={{
													width: 150,
													height: 150,
													margin: 10,
												}}
												source={{
													uri: report.images[index],
												}}
												onLoadStart={() =>
													setLoading(true)
												}
												onLoadEnd={() =>
													setLoading(false)
												}
											/>
										</TouchableOpacity>
										<ActivityIndicator
											animating={loading}
											size={"large"}
											color="#FFF"
										/>
									</View>
								);
							})}
						</ScrollView>
					</View>
				</View>
			)}
			{report.location !== null && report.location.length > 0 && (
				<View style={styles.single}>
					<View style={{ flexDirection: "column" }}>
						<Text
							style={{
								color: "#FFF",
								fontSize: 18,
								margin: 10,
							}}
						>
							Location
						</Text>
						<View style={{ alignItems: "center" }}>
							<MapView
								style={{
									width: "95%",
									height: 200,
									borderRadius: 5,
								}}
								region={{
									latitude: report.location[0],
									longitude: report.location[1],
									latitudeDelta: 0.0922,
									longitudeDelta: 0.0421,
								}}
							>
								<Marker
									coordinate={{
										latitude: report.location[0],
										longitude: report.location[1],
									}}
								/>
							</MapView>
						</View>
					</View>
				</View>
			)}
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
			<View style={{ width: "100%", height: 200 }} />
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
