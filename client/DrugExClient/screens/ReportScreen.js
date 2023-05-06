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
import { ActivityIndicator } from "react-native";

export default function ReportScreen() {
	const navigation = useNavigation();

	const randomId = function (length = 6) {
		return Math.random()
			.toString(36)
			.substring(2, length + 2);
	};

	// Fields
	// Mandatory Fields
	const [incidentDescription, setIncidentDescription] = useState(null);
	const [incidentDate, setIncidentDate] = useState(null);
	const [city, setCity] = useState(null);
	const [address, setAddress] = useState(null);
	const [gender, setGender] = useState(null);
	const [appearance, setAppearance] = useState(null);
	// Optional Fields
	const [traffickingType, setTraffickingType] = useState(null);
	const [transportMethod, setTransportMethod] = useState(null);
	const [approxAge, setApproxAge] = useState(null);
	const [otherInfo, setOtherInfo] = useState(null);
	const [image, setImage] = useState([]);
	const [location, setLocation] = useState([]);

	const [uploading, setUploading] = useState(false);
	const [imageCount, setImageCount] = useState(0);

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
				allowsMultipleSelection: true,
			});

			if (!result.canceled) {
				setImage(result.assets[0].uri);
				setImageCount(result.assets.length);
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
				fetch(domain + "location/get-location?url=" + url)
					.then((res) => res.json())
					.then((data) => setLocation(data.location))
					.catch((err) => console.log(err));
			});
			Alert.alert(
				"Image Uploaded!!!",
				"Your images have been received in our servers",
				[
					{
						text: "Ok",
						style: "cancel",
					},
				]
			);
			setImage(null);
		} catch (e) {
			console.log(e);
		}
		setImageCount(0);
	};

	const cancelSelected = () => {
		setImageCount(0);
		setImage(null);
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

	const checkData = () => {
		if (
			incidentDescription === null ||
			incidentDate === null ||
			city === null ||
			address === null ||
			gender === null ||
			appearance === null ||
			traffickingType === null
		) {
			Alert.alert("Empty Fields", "Please Fill All The Mandatory Fields");
			return false;
		}
		return true;
	};

	// TODO: Change Domain Regularly For Different WIFI.
	const domain = "http://192.168.29.45:8000/";
	// const domain = "http://192.168.29.45:8000/";

	const uploadData = () => {
		const reportId = randomId(10);
		const body = {
			report_id: reportId,
			report_time: new Date() + "",
			incident_description: incidentDescription,
			incident_date: incidentDate,
			city: city,
			address: address,
			gender: gender,
			appearance: appearance,
			transport_method: transportMethod,
			trafficking_type: traffickingType,
			approxAge: approxAge,
			otherInfo: otherInfo,
			images: imageUrl != null ? [imageUrl] : null,
			location: location,
		};
		console.log(JSON.stringify(body));
		fetch(domain + "reports/report-crime", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
	};

	const submitData = () => {
		try {
			if (checkData()) {
				uploadData();
				navigation.replace("AppreciationScreen");
			}
		} catch (e) {
			console.log(e);
		}
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
						value={incidentDescription}
						onChangeText={(value) => setIncidentDescription(value)}
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
									{incidentDate === null
										? "Select Date"
										: incidentDate}
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
						<View style={styles.mandatory}>
							<Text style={styles.text}>Trafficking Type: </Text>
							<Text style={styles.symbol}>*</Text>
						</View>
						<SelectList
							boxStyles={[styles.input, { width: 150 }]}
							dropdownStyles={{ backgroundColor: "#D2D2D2" }}
							data={[
								{ key: "Drugs", value: "Drugs" },
								{ key: "Human", value: "Human" },
								{ key: "Organ", value: "Organ" },
								{ key: "Goods", value: "Goods" },
							]}
							placeholder="Select Type"
							setSelected={(type) => setTraffickingType(type)}
							search={false}
						/>
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
						<TextInput
							style={[styles.input, { width: 150 }]}
							value={transportMethod}
							onChangeText={(value) => setTransportMethod(value)}
						/>
					</View>
					<View style={styles.fields}>
						<View style={styles.mandatory}>
							<Text style={styles.text}>City: </Text>
							<Text style={styles.symbol}>*</Text>
						</View>
						<TextInput
							style={[styles.input, { width: 150 }]}
							value={city}
							onChangeText={(value) => setCity(value)}
						/>
					</View>
				</View>
				<View style={styles.fields}>
					<View style={styles.mandatory}>
						<Text style={styles.text}>Address: </Text>
						<Text style={styles.symbol}>*</Text>
					</View>
					<TextInput
						style={styles.input}
						multiline={true}
						value={address}
						onChangeText={(value) => setAddress(value)}
					/>
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
								{ key: "Male", value: "Male" },
								{ key: "Female", value: "Female" },
								{ key: "Others", value: "Others" },
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
							value={approxAge}
							onChangeText={(value) => setApproxAge(value)}
						/>
					</View>
				</View>
				<View style={styles.fields}>
					<View style={styles.mandatory}>
						<Text style={styles.text}>Appearance: </Text>
						<Text style={styles.symbol}>*</Text>
					</View>
					<TextInput
						style={styles.input}
						multiline={true}
						value={appearance}
						onChangeText={(value) => setAppearance(value)}
					/>
				</View>
				<View style={styles.fields}>
					<Text style={styles.text}>Other Info: </Text>
					<TextInput
						style={styles.input}
						multiline={true}
						value={otherInfo}
						onChangeText={(value) => setOtherInfo(value)}
					/>
				</View>
				{imageCount == 0 && (
					<View style={styles.fields}>
						<Text style={styles.text}>
							Upload Evidence If Any:{" "}
						</Text>
						<CustomButton
							title={"Add Photo/Video"}
							onPress={pickImage}
						/>
					</View>
				)}
				{imageCount > 0 && (
					<View style={styles.fields}>
						<Text style={styles.text}>
							Selected {imageCount} Image(s)
						</Text>
						{!uploading ? (
							<>
								<CustomButton
									title={"Upload Image"}
									onPress={uploadImage}
								/>
								<CustomButton
									title={"Cancel"}
									onPress={cancelSelected}
								/>
							</>
						) : (
							<ActivityIndicator
								animating={uploading}
								size={"large"}
								color={"#FFF"}
							/>
						)}
					</View>
				)}
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
