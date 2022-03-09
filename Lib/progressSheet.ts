import Animated from 'react-native-reanimated';

export interface ProgressSheetAnimatedInterface {
  show: boolean;
  color: string;
}

export interface ProgressSheetInterface {
  answer: string;
  show: Animated.SharedValue<ProgressSheetAnimatedInterface>;
}
