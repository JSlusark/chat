// chat page
import { useState, useEffect, useCallback } from "react";
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ isConnected, db, route, navigation, storage }) => {
	const { name, selectedColor, userID } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// Set screen title according to given name from prop
		navigation.setOptions({ title: name });
		let unsubMessages = null;
		/**
		 * If the user is connected to the internet, register a listener to the database
		 * to read messages. If the user is offline, load messages from offline storage.
		 */
		if (isConnected === true) {
			// Unregister current onSnapshot() listener to avoid registering multiple
			// listeners when useEffect code is re-executed.
			if (unsubMessages) unsubMessages();
			// Create stream with database to read messages
			const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
			unsubMessages = onSnapshot(q, (docSnap) => {
				let msgList = [];
				docSnap.forEach((doc) => {
					msgList.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				cacheMessages(msgList);
				setMessages(msgList);
			});
		} else {
			loadCachedMessages();
		}

		// Clean up code
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, [isConnected]);

	/**  Save messages to offline storage
	  //Array of messages to save to offline storage
	  // Save messages to offline storage
	  */
	const cacheMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
		} catch (error) {
			console.log(error.message);
		}
	};

	// Load messages from AsyncStorage cache
	const loadCachedMessages = async () => {
		try {
			const cachedChat = await AsyncStorage.getItem("messages");
			cachedChat ? setMessages(JSON.parse(cachedChat)) : setMessages([]);
		} catch (error) {
			console.log(error.message);
		}
	};

	// Append new message to firestore
	const onSend = (newMessages) => {
		addDoc(collection(db, "messages"), newMessages[0]);
	};

	// callback to pass to the GiftedChat InputToolbar property. Check the state of isConnected bool, if false, don't render text input toolbar.
	const renderInputToolbar = (props) => {
		if (isConnected) return <InputToolbar {...props} />;
		else return null;
	};

	// Function to customize the appearance of chat bubbles
	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: `rgba(0, 0, 0, 0.2)`,
					},
					left: {
						backgroundColor: "#ffffff",
					},
				}}
			/>
		);
	};

	const renderCustomActions = (props) => {
		return (
			<CustomActions
				storage={storage}
				{...props}
			/>
		);
	};

	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<MapView
					style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
					region={{
						latitude: currentMessage.location.latitude,
						longitude: currentMessage.location.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			);
		}
		return null;
	};

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: selectedColor.backgroundColor },
			]}
		>
			<GiftedChat
				renderBubble={renderBubble}
				messages={messages}
				renderInputToolbar={renderInputToolbar}
				onSend={(messages) => onSend(messages)}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
				user={{
					_id: userID,
					name,
				}}
			/>

			{Platform.OS === "android" ? (
				<KeyboardAvoidingView behavior="height" />
			) : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Chat;
