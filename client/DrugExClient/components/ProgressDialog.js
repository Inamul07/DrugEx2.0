import React from "react";
import { Modal, View, StyleSheet, Text, ActivityIndicator } from "react-native";

const ProgressDialog = ({ visible }) => (
	<Modal visible={visible}>
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Please Wait</Text>
				<View style={styles.loading}>
					<View style={styles.loader}>
						<ActivityIndicator size="large" />
					</View>
					<View style={styles.loadingContent}>
						<Text>Loading</Text>
					</View>
				</View>
			</View>
		</View>
	</Modal>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, .5)",
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		padding: 35,
		backgroundColor: "white",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	loading: {
		flexDirection: "row",
		alignItems: "center",
	},
	loader: {
		flex: 1,
	},
	loadingContent: {
		flex: 3,
		fontSize: 16,
		paddingHorizontal: 10,
	},
});

export default ProgressDialog;
