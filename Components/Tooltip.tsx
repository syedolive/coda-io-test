import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {Colors, Font} from '../Styles/Styles';
import {TooltipInterface} from '../Lib/tooltip';

const Tooltip = ({show, text, index}: TooltipInterface) => {
  const tooltipAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: show.value.index === index && show.value.show ? 1 : 0,
    };
  });
  return (
    <Animated.View style={[styles.tooltipContainer, tooltipAnimatedStyle]}>
      <View style={styles.tooltipArrow} />
      <Text style={styles.tooltipTxt}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: -20,
    transform: [{translateY: -30}],
  },
  tooltipTxt: {
    color: Colors.primaryColor,
    fontFamily: Font.regular,
    fontSize: 12,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{rotate: '180deg'}],
  },
});
export default memo(Tooltip);
