// startpage

import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ImageBackground,
	Image,
	Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { getAuth, signInAnonymously } from "firebase/auth";
import CustomActions from "./CustomActions";

const Start = ({ navigation }) => {
	const svgMarkup = `
		<svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	    <!-- Generator: Sketch 55 (78076) - https://sketchapp.com -->
	    <title>icon</title>
	    <desc>Created with Sketch.</desc>
	    <defs>
	        <path d="M12,13.2533333 C15.24,13.2533333 21.6,14.830125 21.6,18.105 L21.6,20.5308333 L2.4,20.5308333 L2.4,18.105 C2.4,14.830125 8.76,13.2533333 12,13.2533333 Z M20.64,19.5708333 L20.64,18.105 C20.64,16.0913979 15.9773097,14.2133333 12,14.2133333 C8.02269035,14.2133333 3.36,16.0913979 3.36,18.105 L3.36,19.5708333 L20.64,19.5708333 Z M12,11.36 C9.624,11.36 7.68,9.443 7.68,7.1 C7.68,4.757 9.624,2.84 12,2.84 C14.376,2.84 16.32,4.757 16.32,7.1 C16.32,9.443 14.376,11.36 12,11.36 Z M12,10.4 C13.8487889,10.4 15.36,8.90977792 15.36,7.1 C15.36,5.29022208 13.8487889,3.8 12,3.8 C10.1512111,3.8 8.64,5.29022208 8.64,7.1 C8.64,8.90977792 10.1512111,10.4 12,10.4 Z" id="path-1"></path>
	    </defs>
	    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
	        <g id="iPhone-XR" transform="translate(-58.000000, -389.000000)">
	            <g id="Form" transform="translate(24.000000, 355.000000)">
	                <g id="Form-Field_Name" transform="translate(16.000000, 16.000000)">
	                    <g id="icon" transform="translate(16.000000, 16.000000)">
	                        <rect id="bounds" x="0" y="0" width="24" height="23.6666667"></rect>
	                        <mask id="mask-2" fill="white">
	                            <use xlink:href="#path-1"></use>
	                        </mask>
	                        <use id="profile" fill="#757083" fill-rule="nonzero" xlink:href="#path-1"></use>
	                    </g>
	                </g>
	            </g>
	        </g>
	    </g>
	</svg>
	    </svg>
	  `;
	const auth = getAuth();
	const [name, setName] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	const selectColorOnPress = (color) => {
		setSelectedColor(color === selectedColor ? null : color);
	};

	const getBackgroundStyle = () => {
		return selectedColor
			? { backgroundColor: selectedColor.backgroundColor }
			: null;
	};

	const signInUser = () => {
		signInAnonymously(auth)
			.then((userCredential) => {
				const { user } = userCredential;
				// Navigate to the Chat screen with user ID, name, and color
				navigation.navigate("Chat", {
					userID: user.uid,
					name: name,
					selectedColor: selectedColor,
				});
				Alert.alert("Signed in successfully!");
			})
			.catch((error) => {
				console.log(error);
				Alert.alert("Unable to sign in, try again later.");
			});
	};

	return (
		<ImageBackground
			source={require("../assets/bgimage.png")}
			resizeMode="cover"
			style={[styles.body, getBackgroundStyle()]}
		>
			<View style={styles.titleSection}>
				<Text style={styles.title}>Chatapp!</Text>
			</View>
			<View style={styles.loginBox}>
				<SvgXml
					xml={svgMarkup}
					style={styles.humanIcon}
				/>
				<TextInput
					style={styles.textInput}
					value={name}
					onChangeText={setName}
					placeholder="Username"
				/>
				<Text style={styles.chooseText}>Choose a background color:</Text>
				<View style={styles.circleContainer}>
					<TouchableOpacity
						style={[
							styles.circle,
							styles.grey,
							selectedColor === styles.grey && styles.selectedColor,
						]}
						onPress={() => selectColorOnPress(styles.grey)}
					></TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.circle,
							styles.mauve,
							selectedColor === styles.mauve && styles.selectedColor,
						]}
						onPress={() => selectColorOnPress(styles.mauve)}
					></TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.circle,
							styles.azul,
							selectedColor === styles.azul && styles.selectedColor,
						]}
						onPress={() => selectColorOnPress(styles.azul)}
					></TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.circle,
							styles.mint,
							selectedColor === styles.mint && styles.selectedColor,
						]}
						onPress={() => selectColorOnPress(styles.mint)}
					></TouchableOpacity>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={signInUser}
				>
					<Text style={styles.buttonText}>Start Chatting</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 2,
		justifyContent: "center",
		padding: 50,
	},
	titleSection: {
		flex: 1,
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 70,
		paddingTop: 70,
	},
	loginBox: {
		flex: 1,
		backgroundColor: "white",
		width: "100%",
		justifyContent: "center",
		position: "absolute",
		padding: 20,
		paddingLeft: 20,
		paddingRight: 20,
		marginLeft: 50,
	},
	humanIcon: { position: "relative", top: 40, left: 12 },
	textInput: {
		width: "100%",
		padding: 15,
		borderWidth: 1,
		marginBottom: 25,
		paddingLeft: 40,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#8480a0",
		padding: 20,
		width: "100%",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
	chooseText: {
		fontWeight: "bold",
		textAlign: "left",
	},
	circleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		justifyContent: "center",
	},
	circle: {
		width: 60,
		height: 60,
		borderRadius: 60,
		margin: 3,
	},
	selectedColor: {
		borderWidth: 3,
		borderColor: "black",
		padding: 10,
	},
	grey: { backgroundColor: "grey" },
	mauve: { backgroundColor: "#AC8EB2" },
	azul: { backgroundColor: "#a6c5d9" },
	mint: { backgroundColor: "#b2d3b6" },
});

export default Start;
