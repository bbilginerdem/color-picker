import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { ColorPicker } from './components/ColorPicker';

const COLORS = [
	'#001219',
	'#005F73',
	'#0A9396',
	'#94D2BD',
	'#E9D8A6',
	'#EE9B00',
	'#CA6702',
	'#BB3E03',
	'#AE2012',
	'#9B2226',
];

const { width } = Dimensions.get('window')
const PICKER_WIDTH = width * 0.9;

export default function App() {
	const pickedColor = useSharedValue<string | number>(COLORS[1])

	const onColorChanged = useCallback((color: string | number) => {
		'worklet'
		pickedColor.value = color
	}, [])

	const reAnimatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: pickedColor.value
		}
	})

	return (
		<>
			<Animated.View style={[styles.top, reAnimatedStyle]}></Animated.View>
			<View style={styles.bottom}>
				<Text style={styles.pickedHex}>{pickedColor.value}</Text>
				<ColorPicker
					colors={COLORS}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={styles.gradient}
					maxWidth={PICKER_WIDTH}
					onColorChanged={onColorChanged}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	top: {
		flex: 6,
	},
	bottom: {
		flex: 1,
		backgroundColor: '#22223b',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pickedHex: {
		color: '#fff',
		bottom: 10,
		fontSize: 20,
	},
	gradient: {
		height: 40,
		width: PICKER_WIDTH,
		borderRadius: 20
	},
});
