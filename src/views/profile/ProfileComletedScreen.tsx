import React from 'react';
import {Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CheckCompleted from '../../images/icons/check_completed.svg';
import HomeIcon from '../../images/icons/home_icon.svg';
import {Colors} from '../../constants/colors';
import {getLineHeight} from '../../utils/utils';
import {useAppContext} from '../../context/AppContext';

const ProfileCompletedScreen = () => {
  const {completeOnboarding} = useAppContext();

  const handleClick = () => {
    completeOnboarding();
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#20AC87FC', '#1E7F85']}
        style={styles.container}>
        <CheckCompleted width={100} height={100} />
        <Text style={styles.title}>Profile Completed</Text>
        <Text style={styles.description}>
          You've personalized your journey and committed to the Climate
          Manifesto. You're ready to make a difference!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <HomeIcon />
          <Text style={styles.buttonText}> Let's Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 40,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: Colors.White,
    lineHeight: getLineHeight(24, 120),
    marginBottom: 6,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: Colors.White,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
  },
});
export default ProfileCompletedScreen;
