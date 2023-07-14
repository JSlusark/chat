import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox, Alert } from "react-native";
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Setting up Firebase connection
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	disableNetwork,
	enableNetwork,
} from "firebase/firestore";
//connectivity state
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
	const firebaseConfig = {
		apiKey: "AIzaSyBfYBARJH9vH502uutCVablh8CIfYVxYXI",
		authDomain: "chatapp-c42ae.firebaseapp.com",
		projectId: "chatapp-c42ae",
		storageBucket: "chatapp-c42ae.appspot.com",
		messagingSenderId: "866276095622",
		appId: "1:866276095622:web:5e8bc4ca0edb8c957e8307",
		measurementId: "G-F26553J9QE",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);

	//network connectivity status
	const connectionStatus = useNetInfo();

	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert("Connection Lost!");
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Start">
				<Stack.Screen name="Start">
					{(props) => (
						<Start
							db={db}
							{...props}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name="Chat">
					{(props) => (
						<Chat
							isConnected={connectionStatus.isConnected}
							db={db}
							{...props}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default App;
