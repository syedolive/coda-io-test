import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  PixelRatio,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Colors, Font} from './Styles/Styles';
import Tooltip from './Components/Tooltip';
import {ExerciseEnum} from './Lib/exercise.enum';
import {schema} from './Data/sample.schema';
import {ExerciseSchema} from './Lib/exercise.schema';
import {TooltipAnimatedInterface} from './Lib/tooltip';
import ProgressSheet from './Components/ProgressSheet';
import {ProgressSheetAnimatedInterface} from './Lib/progressSheet';

const {getFontScale} = PixelRatio;
const {width} = Dimensions.get('window');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const App: NavigationFunctionComponent = ({componentId}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [exercise, setExercise] = useState<ExerciseSchema>(schema);
  const [selectedHint, setSelectedHint] = useState<string>('');
  const [progress, setProgress] = useState<ExerciseEnum>(ExerciseEnum.Pending);
  const [answer, setAnswer] = useState<string>('');
  useEffect(() => {
    setAnswer(exercise.exercise.filter(item => item.toGuess)[0].ger);
  }, [exercise]);
  const selected: Animated.SharedValue<boolean> = useSharedValue(false);
  const buttonColor: Animated.SharedValue<string> = useSharedValue(
    Colors.selectionColor,
  );
  const buttonTextColor: Animated.SharedValue<string> = useSharedValue('white');
  const showTooltip: Animated.SharedValue<TooltipAnimatedInterface> =
    useSharedValue({
      show: false,
      index: 0,
    });
  const showProgress: Animated.SharedValue<ProgressSheetAnimatedInterface> =
    useSharedValue({
      show: false,
      color: '',
    });
  const selectedHintAnimatedStyle = useAnimatedStyle(() => ({
    opacity: selected.value ? 1 : 0,
  }));
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: buttonColor.value,
    };
  });
  const buttonTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: buttonTextColor.value,
    };
  });
  const _setSelection = (selection: string) => {
    setSelectedHint(selection);
    selected.value = true;
    buttonColor.value = Colors.appBarColor;
    setProgress(ExerciseEnum.Selected);
  };
  const _onExerciseTextPress = (index: number) => {
    showTooltip.value = {
      show: true,
      index: index,
    };
  };
  const _onContinue = () => {
    switch (progress) {
      case ExerciseEnum.Selected:
        showProgress.value = {
          show: true,
          color:
            selectedHint === answer ? Colors.successColor : Colors.dangerColor,
        };
        buttonColor.value = 'white';
        buttonTextColor.value =
          selectedHint === answer ? Colors.successColor : Colors.dangerColor;
        setProgress(
          selectedHint === answer ? ExerciseEnum.Success : ExerciseEnum.Failed,
        );
        break;
      case ExerciseEnum.Pending:
        alert("you haven't made any selection yet");
        break;
      default:
        showProgress.value = {show: false, color: Colors.selectionColor};
        buttonColor.value = Colors.selectionColor;
        buttonTextColor.value = 'white';
        setProgress(ExerciseEnum.Pending);
        setSelectedHint('');
        selected.value = false;
    }
  };
  const _renderHints = useCallback(() => {
    return exercise.hints.map((item, index) => (
      <Pressable
        key={String(index)}
        onPress={() => _setSelection(item)}
        style={styles.hint}>
        <Text style={styles.hintTxt}>{item}</Text>
      </Pressable>
    ));
  }, []);
  const _renderExerciseText = useCallback(() => {
    return exercise.exercise.map((item, index) => {
      if (item.toGuess) {
        return (
          <Text
            key={String(index)}
            style={[styles.exercise, styles.exerciseRequired]}>
            {item.eng}
          </Text>
        );
      }
      return (
        <Text style={styles.exercise} key={String(index)}>
          {item.eng}
        </Text>
      );
    });
  }, []);
  const _renderExerciseQuiz = () => {
    return exercise.exercise.map((item, index) => {
      if (item.toGuess) {
        return (
          <View key={String(index)} style={styles.selectionContainer}>
            <View style={styles.blank} />
            <Animated.View
              style={[
                styles.hint,
                styles.selectedHintStyle,
                selectedHintAnimatedStyle,
              ]}>
              <Text style={[styles.hintTxt]}>{selectedHint}</Text>
            </Animated.View>
          </View>
        );
      }
      return (
        <Pressable
          key={String(index)}
          onPress={() => _onExerciseTextPress(index)}>
          <Tooltip text={item.eng} index={index} show={showTooltip} />
          <Text style={styles.exerciseText}>{item.ger}</Text>
        </Pressable>
      );
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill in the missing word.</Text>
      <View style={styles.exerciseTextContainer}>{_renderExerciseText()}</View>
      <View style={styles.exerciseContainer}>{_renderExerciseQuiz()}</View>
      <View style={styles.exerciseHints}>{_renderHints()}</View>
      <Pressable onPress={_onContinue} style={{zIndex: 1}}>
        <Animated.View style={[styles.button, buttonAnimatedStyle]}>
          <Animated.Text style={[styles.buttonTxt, buttonTextAnimatedStyle]}>
            {progress === ExerciseEnum.Selected ? 'Check Answer' : 'Continue'}
          </Animated.Text>
        </Animated.View>
      </Pressable>

      <ProgressSheet answer={answer} show={showProgress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.primaryColor,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Font.regular,
  },
  exercise: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: (getFontScale() * width) / 12,
    fontFamily: Font.regular,
    marginHorizontal: 3,
  },
  exerciseRequired: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  exerciseText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Font.regular,
    letterSpacing: 1,
    marginHorizontal: 5,
    borderStyle: 'dotted',
    borderBottomWidth: 1,
    borderColor: 'white',
    zIndex: 1,
  },
  blank: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 1,
    flex: 1,
    position: 'absolute',
    top: 10,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 20,
  },
  exerciseHints: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 20,
  },
  hint: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  hintTxt: {
    fontFamily: Font.semiBold,
    fontSize: 18,
    color: Colors.primaryColor,
  },
  button: {
    height: 48,
    backgroundColor: Colors.selectionColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    elevation: 1,
    zIndex: 1,
  },
  buttonTxt: {
    fontFamily: Font.medium,
    textTransform: 'uppercase',
  },
  selectionContainer: {
    flex: 1,
    marginHorizontal: 3,
    minWidth: '40%',
    maxWidth: '40%',
  },
  selectedHintStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
