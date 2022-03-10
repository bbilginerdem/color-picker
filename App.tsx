import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ColorPicker } from './components/ColorPicker';

const COLORS = [
	'red',
	'purple',
	'blue',
	'cyan',
	'green',
	'yellow',
	'orange',
	'black',
	'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const PICKER_WIDTH = Dimensions.get('window').width * 0.9;

export default function App() {
	return (
		<>
			<View style={styles.topContainer}>
			</View>
			<View style={styles.bottomContainer}>
				<ColorPicker colors={COLORS} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.gradient} />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	topContainer: {
		flex: 3,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottomContainer: {
		flex: 1,
		backgroundColor: BACKGROUND_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gradient: {
		height: 40,
		width: PICKER_WIDTH,
		borderRadius: 20
	}
});
