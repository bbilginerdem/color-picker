import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated';

const CIRCLE_PICKER_SIZE = 40

interface ColorPickerProps extends LinearGradientProps {
	maxWidth: number
	onColorChanged?: (color: string | number) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, start, end, style, maxWidth, onColorChanged }) => {

	const translateX = useSharedValue(0)
	const adjustedTranslateX = useDerivedValue(() => {
		return Math.min(Math.max(translateX.value, 0), maxWidth - CIRCLE_PICKER_SIZE)
	})

	const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number }>({
		onStart: (_, context) => {
			context.x = adjustedTranslateX.value
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.x;
		},
	})

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: adjustedTranslateX.value },
			]
		}
	})

	const rInternalPickerStyle = useAnimatedStyle(() => {
		const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth)
		const backgroundColor = interpolateColor(
			translateX.value,
			inputRange,
			colors
		)

		onColorChanged?.(backgroundColor)

		return {
			backgroundColor,
		}
	})

	return (
		<PanGestureHandler onGestureEvent={panGestureEvent}>
			<Animated.View style={{ justifyContent: 'center' }}>
				<LinearGradient colors={colors} start={start} end={end} style={style} />
				<Animated.View style={[styles.picker, rStyle, rInternalPickerStyle]} />
			</Animated.View>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	picker: {
		position: 'absolute',
		width: CIRCLE_PICKER_SIZE,
		height: CIRCLE_PICKER_SIZE,
		borderRadius: CIRCLE_PICKER_SIZE / 2,
		borderWidth: 2.4,
		borderColor: '#fff',
	},
})

export { ColorPicker }