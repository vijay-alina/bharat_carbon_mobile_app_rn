import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgImage from '../../../images/icons/background_image.png';
import AvatarPlaceholder from '../../../images/icons/avatar_placeholder.png';
import LevelBadgeImage from '../../../images/icons/level_badge_icon.png';
import { Header } from '../../../common/header';
import { Colors } from '../../../constants/colors';
import RankComponent from './RankComponent';
import StatisticsItemComp from './StatisticsItemComp';
import BadgeComp from './BadgeComp';
import { DEVICE_WIDTH } from '../../../utils/utils';
import ChallengeComp from '../../../components/ChallengeComp';
import LinearGradient from 'react-native-linear-gradient';
import LeafIcon from '../../../images/icons/class_rank_green_icon.svg'
import Verticaldevider from '../../../images/icons/vertical_divider.png'
import Divider from '../../../images/icons/divider.png';
import PointsIcon from '../../../images/icons/phonepe-icon.png'

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
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Header
              isHomeScreen={false}
              title="My Profile"
              hasTransparentBackground={true}
              textStyle={{ color: Colors.White }}
              onBackClick={handleBackClick}
            />
            <View style={styles.avatarContainer}>
              <Image source={AvatarPlaceholder} style={styles.avatar} />
            </View>
            <Image source={LevelBadgeImage} style={styles.levelBadge} />
            <Text style={styles.nameText}>Akshay Swami</Text>
            <RankComponent earnedPoints={545} schoolRank={123} classRank={467} />
            <View style={styles.statRowContainer}>
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
            <View style={{marginVertical:10}}>
              <ChallengeComp
                icon={require('../../../images/icons/badge_green_eater.png')}
                header="Save Water Challenge"
                duration={4}
                description="Keep it up! Every drop counts."
              />
            </View>
            <View style={styles.lowerContainer}>
              <Text style={styles.title}>Your Family's Green Impact</Text>
              <LinearGradient
                colors={[Colors.LightGreen, Colors.DarkGreen]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.statContainer}>
                <View style={styles.leftStat}>
                  <LeafIcon width={24} height={24} />
                  <Text style={styles.statDescription}>TOTAL EMISSION</Text>
                  <Text style={styles.statTitle}>124.5 KG CO2e</Text>
                </View>
                <Image
                  source={Verticaldevider}
                  style={{ width: 3, height: 60, }}
                />
                <View style={styles.leftStat}>
                  <LeafIcon width={24} height={24} />
                  <Text style={styles.statDescription}>TOP CONTRIBUTOR</Text>
                  <Text style={styles.statTitle}>Aryan</Text>
                </View>
              </LinearGradient>
              <View style={styles.card}>
                <Image source={AvatarPlaceholder} style={styles.avatar} />
                <Text style={styles.cardTitle}>Aarav Mehta</Text>
                <Text style={styles.cardDescription}>Brother</Text>
                <Image source={Divider} style={{ width: 100, height: 2, marginVertical: 10 }} />
                <View style={styles.cardPointsRow}>
                  <Text style={styles.cardPointsDescription}>Points earned</Text>
                  <View style={styles.cardPointsContainer}>
                    <Image source={PointsIcon} style={{ width: 12, height: 12 }} />
                    <Text style={styles.cardPointsText}>480 Pts</Text>
                  </View>
                </View>
                <View style={[styles.cardPointsRow, { marginTop: 5 }]}>
                  <Text style={styles.cardPointsDescription}>Emissions (CO2e)</Text>
                  <View style={[styles.cardPointsContainer,]}>
                    <Image source={PointsIcon} style={{ width: 12, height: 12 }} />
                    <Text style={styles.cardPointsText}>29.3 kg</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
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
    // alignItems: 'center',
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
  statRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scrollContent: {
    // flex: 1,
    paddingBottom: 40,
    alignItems: 'center',
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
  lowerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginVertical: 20,
    textAlign: 'left'
  },
  statContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 16,

  },
  leftStat: {
    width: DEVICE_WIDTH * 0.45,
    alignItems: "center"

  },
  statDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.White
  },
  statTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
  },
  card: {
    marginTop: 20,
    width: "50%",
    height: 220,
    backgroundColor: Colors.White,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    alignItems: 'center',
    padding: 10,

  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginTop: 10
  },
  cardDescription: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.MediumGrey,
    textAlign: 'center',
  },
  cardPointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardPointsDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.MediumGrey,
  },
  cardPointsContainer: {
    gap: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPointsText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
});
