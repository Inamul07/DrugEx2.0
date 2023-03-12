import { useNavigation } from "@react-navigation/native";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	Platform,
	TouchableOpacity,
	Alert,
} from "react-native";
import colors from "../assets/color";
import CustomButton from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Entypo } from "@expo/vector-icons";
import { firebase } from "../config";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

export default function ReportScreen() {
	const navigation = useNavigation();

	// Variables
	const [incidentDate, setIncidentDate] = useState("Select Date");
	const [gender, setGender] = useState("");
	const [image, setImage] = useState(null);

	const [uploading, setUploading] = useState(false);

	const pickImage = async () => {
		try {
			const { status } =
				await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				alert(
					"Sorry, we need camera roll permissions to make this work!"
				);
				return;
			}

			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
			});

			if (!result.canceled) {
				console.log(result.assets);
				setImage(result.assets[0].uri);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const [imageUrl, setImageUrl] = useState(null);
	const storage = getStorage();

	const uploadImage = async () => {
		setUploading(true);
		const response = await fetch(image);
		const blob = await response.blob();
		const filename = image.substring(image.lastIndexOf("/") + 1);

		try {
			await firebase.storage().ref().child(filename).put(blob);
			setUploading(false);
			getDownloadURL(ref(storage, filename)).then((url) => {
				setImageUrl(url);
			});
			Alert.alert("Image Uploaded!!!");
			setImage(null);
		} catch (e) {
			console.log(e);
		}
	};

	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);

		let tmpDate = new Date(currentDate);
		let fDate =
			tmpDate.getDate() +
			"/" +
			(tmpDate.getMonth() + 1) +
			"/" +
			tmpDate.getFullYear();
		setIncidentDate(fDate);
	};

	const submitData = () => {
		console.log(imageUrl);
		navigation.replace("AppreciationScreen");
	};

	return (
		<ScrollView style={styles.container}>
			<View>
				<Text
					style={[
						styles.text,
						{ paddingHorizontal: 8, marginTop: 10 },
					]}
				>
					About The Incident:
				</Text>
				<View style={styles.fields}>
					<View style={styles.mandatory}>
						<Text style={styles.text}>Incident Description: </Text>
						<Text style={styles.symbol}>*</Text>
					</View>
					<TextInput
						style={styles.input}
						placeholder="What did you see or hear"
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.fields}>
						<View style={styles.mandatory}>
							<Text style={styles.text}>Incident Date: </Text>
							<Text style={styles.symbol}>*</Text>
						</View>
						<TouchableOpacity onPress={() => setShow(true)}>
							<View
								style={[
									styles.input,
									{
										width: 150,
										flexDirection: "row",
										justifyContent: "space-between",
									},
								]}
							>
								<Text
									style={{
										fontSize: 18,
										alignSelf: "center",
									}}
								>
									{incidentDate}
								</Text>
								<Entypo
									name="calendar"
									color="#000"
									size={24}
								/>
							</View>
						</TouchableOpacity>
						{show && (
							<DateTimePicker
								value={date}
								mode={"date"}
								display="default"
								onChange={onChange}
								maximumDate={new Date()}
							/>
						)}
					</View>
					<View style={styles.fields}>
						<Text style={styles.text}>Trafficking Type: </Text>
						<TextInput style={[styles.input, { width: 150 }]} />
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.fields}>
						<Text style={styles.text}>Transport Method: </Text>
						<TextInput style={[styles.input, { width: 150 }]} />
					</View>
					<View style={styles.fields}>
						<View style={styles.mandatory}>
							<Text style={styles.text}>City: </Text>
							<Text style={styles.symbol}>*</Text>
						</View>
						<TextInput style={[styles.input, { width: 150 }]} />
					</View>
				</View>
				<View style={styles.fields}>
					<View style={styles.mandatory}>
						<Text style={styles.text}>Address: </Text>
						<Text style={styles.symbol}>*</Text>
					</View>
					<TextInput style={styles.input} multiline={true} />
				</View>
			</View>
			<View>
				<Text
					style={[
						styles.text,
						{ paddingHorizontal: 10, marginTop: 20 },
					]}
				>
					About The Potential Victim:
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<View style={styles.fields}>
						<View style={styles.mandatory}>
							<Text style={styles.text}>Gender: </Text>
							<Text style={styles.symbol}>*</Text>
						</View>
						<SelectList
							boxStyles={[styles.input, { width: 150 }]}
							dropdownStyles={{ backgroundColor: "#D2D2D2" }}
							data={[
								{ key: "1", value: "Male" },
								{ key: "2", value: "Female" },
							]}
							placeholder="Select Gender"
							setSelected={(gender) => setGender(gender)}
							search={false}
						/>
					</View>
					<View style={styles.fields}>
						<Text style={styles.text}>Approx. Age: </Text>
						<TextInput
							style={[styles.input, { width: 150 }]}
							inputMode="numeric"
						/>
					</View>
				</View>
				<View style={styles.fields}>
					<Text style={styles.text}>Other Info: </Text>
					<TextInput style={styles.input} multiline={true} />
				</View>
				<View style={styles.fields}>
					<Text style={styles.text}>Upload Evidence If Any: </Text>
					<CustomButton
						title={"Add Photo/Video"}
						onPress={pickImage}
					/>
					{image != null && (
						<>
							<Text style={styles.text}>Selected 1 Image</Text>
							<CustomButton
								title={"Upload Image"}
								onPress={uploadImage}
							/>
						</>
					)}
				</View>
			</View>
			<View style={styles.lineSeperator} />
			<Text style={[styles.text, { padding: 10, textAlign: "center" }]}>
				We will hold your data securely and not share any details about
				you or your identity with a third party unless we are compelled
				by law to do so.
			</Text>
			<View style={{ marginBottom: 50 }}>
				<CustomButton title="Submit Securely" onPress={submitData} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		paddingHorizontal: 8,
	},
	fields: {
		flexDirection: "column",
		margin: 10,
	},
	mandatory: {
		flexDirection: "row",
	},
	symbol: {
		color: "red",
		fontSize: 18,
	},
	input: {
		backgroundColor: "#D9D9D9",
		marginTop: 8,
		padding: 10,
		fontSize: 18,
		borderRadius: 5,
	},
	lineSeperator: {
		height: 10,
		borderWidth: 2,
		borderColor: colors.primary,
		borderTopColor: "#FFF",
		marginTop: 10,
		position: "relative",
	},
	text: {
		color: "#FFF",
		fontSize: 18,
	},
});
