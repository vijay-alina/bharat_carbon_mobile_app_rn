import React from 'react';
import {
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Image,
} from 'react-native';
import bgImage from '../../images/icons/onboarding_bg1.png';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/colors';
import bharatCarbonImageWhite from '../../images/icons/bharat_carbon_image_white.png';
import {getLineHeight} from '../../utils/utils';
import CustomButton from '../../common/button';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Login button clicked');
    //@ts-ignore
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={bgImage}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[Colors.White30, Colors.White30]}
        style={styles.contentContainer}>
        <Image source={bharatCarbonImageWhite} style={styles.image} />
        <Text style={styles.title}>Reduce Your Carbon Emissions</Text>
        <Text style={styles.description}>
          Learn simple ways to lower your Carbon footprint
        </Text>
        <CustomButton
          onPress={handleLogin}
          text="Login"
          textColor={Colors.BlueShades900}
          style={styles.button}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: width,
    height: height,
  },
  contentContainer: {
    width: width * 0.94,
    borderRadius: 30,
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 170,
    height: 70,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: Colors.White,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: getLineHeight(24, 120),
    paddingTop: 48,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.White,
    textAlign: 'center',
    lineHeight: getLineHeight(16, 120),
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    backgroundColor: Colors.BlueShades500,
  },
});

export default WelcomeScreen;
