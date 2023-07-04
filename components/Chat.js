// chat page
import { useState, useEffect, useCallback } from "react";
import {
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
	const { name, selectedColor } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: name });

		setMessages([
			{
				_id: 1,
				text: `Hello ${name}! 👋`,
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "React Native",
					avatar: "https://placeimg.com/140/140/any",
				},
			},
			{
				_id: 2,
				text: "This is a system message",
				createdAt: new Date(),
				system: true,
			},
		]);
	}, []);

	// Function that adds a new message
	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

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

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: selectedColor.backgroundColor },
			]}
		>
			<GiftedChat
				messages={messages}
				renderBubble={renderBubble}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: 1,
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
