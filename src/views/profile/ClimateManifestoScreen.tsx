import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import ManifestItem from './components/ManifestItem';
import * as Constants from '../../constants/constants';
import CustomButton from '../../common/button';
import {Header} from '../../common/header';
import {Colors} from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const ClimateManifestoScreen = () => {
  const navigation = useNavigation();

  const handleClick = () => {
    //@ts-ignore
    navigation.navigate('ProfileCompletedScreen');
  }
  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      showsVerticalScrollIndicator={false}>
      <Header
        title="Climate Manifesto"
        containerStyle={styles.containerStyle}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.description}>
            Empowering you to make everyday choices that fight climate change
            and build a greener, more sustainable future.
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            {Constants.ClimateManifesto.whatBeBelieve.title}
          </Text>
          {Constants.ClimateManifesto.whatBeBelieve.items.map((item, index) => (
            <ManifestItem key={index} icon={item.icon} title={item.title} />
          ))}
          <Text style={styles.title}>
            {Constants.ClimateManifesto.OurCommitments.title}
          </Text>
          {Constants.ClimateManifesto.OurCommitments.items.map(
            (item, index) => (
              <ManifestItem key={index} icon={item.icon} title={item.title} />
            ),
          )}
          <Text style={styles.title}>
            {Constants.ClimateManifesto.yourRole.title}
          </Text>
          <Text style={styles.joiningUsText}>
            By joining us, You commit to:
          </Text>
          {Constants.ClimateManifesto.yourRole.items.map((item, index) => (
            <ManifestItem key={index} icon={''} title={item.title} />
          ))}
        </View>
        <CustomButton
          text="Accept & Continue"
          onPress={handleClick}
          backgroundColor="#17a086"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerStyle: {
    marginTop: 44,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.NeutralsDark,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: Colors.NeutralsDark,
  },
  joiningUsText: {
    fontFamily: 'Montserrat-Regular',
    marginBottom: 8,
    fontSize: 16,
    color: Colors.NeutralsDark,
  },
  subTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default ClimateManifestoScreen;
