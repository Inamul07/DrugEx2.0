import { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import colors from "../assets/color";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "../components/Modal";

const ChatScreen = () => {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		setModal(true);

		const getMessages = (userId) => {
			fetch(domain + "get-messages?userId=" + userId)
				.then((res) => res.json())
				.then((data) => {
					data = data.reverse();
					setMessages(data);
				})
				.catch((err) => console.log(err));
		};

		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem("USER_ID");
				if (value !== null) {
					setKeyPresent(true);
					setUserId(value);
					getMessages(value);
				}
			} catch (e) {
				console.log(e);
			}
		};

		getData();
	}, []);

	const onSend = useCallback((message = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, message)
		);
	}, []);

	// const domain = "http://192.168.137.210:8000/";
	const domain = "http://192.168.29.45:8000/";

	const postChat = (message) => {
		fetch(domain + "add-chat", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message[0]),
		});
	};

	const [modal, setModal] = useState(false);
	const [keyPresent, setKeyPresent] = useState(false);
	const [userId, setUserId] = useState(null);

	return (
		<View style={{ flex: 1 }}>
			<GiftedChat
				messages={messages}
				showAvatarForEveryMessage={true}
				showUserAvatar={true}
				onSend={(message) => {
					onSend(message);
					postChat(message);
				}}
				messagesContainerStyle={{
					backgroundColor: colors.primary,
				}}
				renderSend={(props) => (
					<Send {...props} containerStyle={styles.sendContainer}>
						<MaterialIcons
							name="send"
							size={24}
							color={colors.primary}
						/>
					</Send>
				)}
				alwaysShowSend
				textInputStyle={{
					backgroundColor: "#FFF",
					borderRadius: 20,
				}}
				user={{
					_id: userId,
					name: userId,
					avatar: "https://robohash.org/" + userId,
				}}
			/>
			{modal && (
				<Modal
					setModal={setModal}
					keyPresent={keyPresent}
					userId={userId}
					setUserId={setUserId}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	sendContainer: {
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginRight: 15,
	},
});

export default ChatScreen;
