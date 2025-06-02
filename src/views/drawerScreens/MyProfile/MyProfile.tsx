import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BgImage from '../../../images/icons/background_image.png';
import AvatarPlaceholder from '../../../images/icons/avatar_placeholder.png';
import LevelBadgeImage from '../../../images/icons/level_badge_icon.png';
import {Header} from '../../../common/header';
import {Colors} from '../../../constants/colors';
import RankComponent from './RankComponent';
import StatisticsItemComp from './StatisticsItemComp';
import BadgeComp from './BadgeComp';
import {DEVICE_WIDTH} from '../../../utils/utils';
import ChallengeComp from '../../../components/ChallengeComp';

const MyProfileScreen = () => {
  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.goBack();
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     StatusBar.setTranslucent(false);
  //     StatusBar.setBarStyle('dark-content');
  //     StatusBar.setBackgroundColor('transparent');

  //     return () => {
  //       // Reset when leaving screen
  //       StatusBar.setTranslucent(false);
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor('#ffffff');
  //     };
  //   }, []),
  // );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BgImage}
        style={styles.backgroundImage}
        resizeMode="cover">
        <SafeAreaView style={styles.content}>
          <Header
            isHomeScreen={false}
            title="My Profile"
            hasTransparentBackground={true}
            textStyle={{color: Colors.White}}
            onBackClick={handleBackClick}
          />
          <View style={styles.avatarContainer}>
            <Image source={AvatarPlaceholder} style={styles.avatar} />
          </View>
          <Image source={LevelBadgeImage} style={styles.levelBadge} />
          <Text style={styles.nameText}>Akshay Swami</Text>
          <RankComponent earnedPoints={545} schoolRank={123} classRank={467} />
          <View style={styles.statContainer}>
            {[1, 2, 3, 4].map((_, i) => (
              <StatisticsItemComp
                key={i}
                icon={require('../../../images/icons/stat_earth_icon.png')}
                statType="Emissiions"
                statValue="29.4 kg CO2e"
              />
            ))}
          </View>
          <View style={styles.badgeContainer}>
            {[1, 2, 3, 4].map((_, i) => (
              <BadgeComp
                key={i}
                badgeIcon={require('../../../images/icons/badge_green_eater.png')}
                badgeName={'Green \n Eater'}
              />
            ))}
          </View>
          <View>
            <ChallengeComp
              icon={require('../../../images/icons/badge_green_eater.png')}
              header="Save Water Challenge"
              duration={4}
              description="Keep it up! Every drop counts."
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 320,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: 20, // Adjust based on your design
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 41,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  levelBadge: {
    width: 61,
    height: 50,
    marginTop: -20,
  },
  nameText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: Colors.White,
    marginVertical: 14,
  },
  statContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgeContainer: {
    width: DEVICE_WIDTH * 0.94,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    borderRadius: 16,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: Colors.Neutral200,
  },
});
