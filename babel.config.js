module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
	};
};

// native web conf https://teovillanueva.github.io/react-native-web-maps/installation/expo-web
