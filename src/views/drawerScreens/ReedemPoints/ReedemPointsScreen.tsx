import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import ReedemPointsImg from '../../../images/icons/reedem-points.png';
import CustomButton from '../../../common/button';
import {Colors} from '../../../constants/colors';
import {Header} from '../../../common/header';
import {useNavigation} from '@react-navigation/native';

const ReedemPointsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Reedem your Points"
        onBackClick={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.innerContainer}>
        <Image source={ReedemPointsImg} style={styles.image} />
        <Text style={styles.title}>Redeem Your Points</Text>
        <Text style={styles.description}>Exciting rewards comming soon!</Text>
        <Text style={styles.descriptionTwo}>
          Get ready to turn your green acions into real-world goodies{' '}
        </Text>
        <View style={styles.btnContainer}>
          <CustomButton
            text="Get Notified"
            backgroundColor={Colors.LightGreen600}
            onPress={() => {
              // Add your redeem logic here
              console.log('Redeem button pressed');
            }}
          />
          <CustomButton
            text="View Earned Points"
            onPress={() => {
              // Add your redeem logic here
              console.log('Redeem button pressed');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Montserrat-regular',
    marginBottom: 10,
    color: Colors.MediumGrey,
  },
  descriptionTwo: {
    fontSize: 16,
    fontFamily: 'Montserrat-regular',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.MediumGrey,
  },
  image: {
    width: 296,
    height: 300,
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  btnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
  },
});

export default ReedemPointsScreen;
