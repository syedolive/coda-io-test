import Animated from 'react-native-reanimated';

export interface TooltipAnimatedInterface {
  show: boolean;
  index: number;
}

export interface TooltipInterface {
  show: Animated.SharedValue<TooltipAnimatedInterface>;
  text: string;
  index: number;
}
