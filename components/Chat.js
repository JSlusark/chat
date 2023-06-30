// chat page
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
	const { name, selectedColor } = route.params;

	useEffect(() => {
		navigation.setOptions({ title: name });
	}, []);

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: selectedColor.backgroundColor },
			]}
		>
			<Text>Welcome {name}! 👋</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Chat;
