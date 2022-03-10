import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';


interface ColorPickerProps extends LinearGradientProps { }

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, start, end, style }) => {

	const translateX = useSharedValue(0)

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
		onStart: () => { },
		onActive: (event) => {
			console.log(event.translationX);
			translateX.value = event.translationX;
		},
		onEnd: () => { },
	})

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }]
		}
	})

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View style={{ justifyContent: 'center' }}>
				<LinearGradient colors={colors} start={start} end={end} style={style} />
				<Animated.View style={[styles.picker, rStyle]} />
			</Animated.View>
		</PanGestureHandler>
	)
}

const CIRCLE_PICKER_SIZE = 42

const styles = StyleSheet.create({
	picker: {
		position: 'absolute',
		backgroundColor: '#fff',
		width: CIRCLE_PICKER_SIZE,
		height: CIRCLE_PICKER_SIZE,
		borderRadius: CIRCLE_PICKER_SIZE / 2
	}
})

export { ColorPicker }