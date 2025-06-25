import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppContext} from '../../context/AppContext';
import {introSteps} from '../../constants/constants';
import PaginationTopBar from './components/DotsWithSkip';
import {Colors} from '../../constants/colors';
import {getLineHeight} from '../../utils/utils';
import CustomButton from '../../common/button';
const {width} = Dimensions.get('window');

export const IntroScreen: React.FC = () => {
  const {completeIntro} = useAppContext();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSkip = () => {
    completeIntro();
  };

  const handleContinue = () => {
    if (currentIndex < introSteps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeIntro();
    }
  };

  const currentScreen = introSteps[currentIndex];

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: currentScreen.backgroundColor},
      ]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={currentScreen.backgroundColor}
      />
      <PaginationTopBar
        onSkip={handleSkip}
        onDotPress={handleDotPress}
        currentIndex={currentIndex}
      />
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{...currentScreen.dimension}}
            source={currentScreen.image}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentScreen.title}</Text>
          <Text style={styles.description}>{currentScreen.description}</Text>
          <CustomButton
            text={
              currentIndex === introSteps.length - 1
                ? "Let's Started"
                : 'Continue Now'
            }
            style={styles.continueButton}
            onPress={handleContinue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: 280,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.White,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: Colors.NeutralsDark,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: getLineHeight(24, 120),
    paddingTop: 48,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.MediumGrey,
    textAlign: 'center',
    lineHeight: getLineHeight(16, 120),
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  continueButton: {
    width: width * 0.8,
    position: 'absolute',
    bottom: 16,
  },
});
