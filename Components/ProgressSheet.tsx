import React, {memo} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ProgressSheetInterface} from '../Lib/progressSheet';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {Colors, Font} from '../Styles/Styles';
const {width, height} = Dimensions.get('window');
const SHEET_HEIGHT: number = height * 0.2;
const ProgressSheet = ({show, answer}: ProgressSheetInterface) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: show.value.show ? 1 : SHEET_HEIGHT}],
      backgroundColor: show.value.color,
    };
  });
  const correctAnswerStyle = useAnimatedStyle(() => ({
    opacity: show.value.color === Colors.successColor ? 1 : 0,
  }));
  const wrongAnswerStyle = useAnimatedStyle(() => ({
    opacity: show.value.color === Colors.dangerColor ? 1 : 0,
  }));
  return (
    <Animated.View style={[styles.sheetContainer, animatedStyle]}>
      <Animated.Text style={[styles.sheetText, correctAnswerStyle]}>
        Great Job!
      </Animated.Text>
      <Animated.Text style={[styles.sheetText, wrongAnswerStyle]}>
        Answer: {answer}
      </Animated.Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    height: SHEET_HEIGHT,
    width: width,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  sheetText: {
    fontFamily: Font.medium,
    color: 'white',
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
export default memo(ProgressSheet);
