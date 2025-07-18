import React, {useEffect} from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
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
import LinearGradient from 'react-native-linear-gradient';
import LeafIcon from '../../../images/icons/class_rank_green_icon.svg';
import Verticaldevider from '../../../images/icons/vertical_divider.png';
import Divider from '../../../images/icons/divider.png';
import PointsIcon from '../../../images/icons/phonepe-icon.png';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {profileDataGet} from '../../../features/myProfile/myProfileThunks';

const MyProfileScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const profiledata = useAppSelector(state => state.myProfile.myProfile);

  const handleBackClick = () => {
    navigation.goBack();
  };

  // TODO: Uncomment and implement status bar configuration when needed
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await dispatch(profileDataGet());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!profiledata) {
      fetchData();
    }
  }, []);

  console.log('profiledata', profiledata);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#23B397" />
        </View>
      ) : (
        profiledata && (
          <ImageBackground
            source={BgImage}
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle}
            resizeMode="cover">
            <SafeAreaView style={styles.content}>
              {/* Fixed header section - non-scrollable */}
              <View style={styles.headerSection}>
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
                <Text style={styles.nameText}>{profiledata.name}</Text>
                <RankComponent
                  earnedPoints={profiledata?.earnedPoints}
                  schoolRank={profiledata?.schoolRank}
                  classRank={profiledata?.classRank}
                />
              </View>

              {/* Scrollable content section */}
              <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}>
                <View style={styles.rowHeaderContainer}>
                  <Text style={{fontWeight: 'bold'}}>Statistics</Text>
                  <Text style={{color: Colors.DarkGreen, fontSize: 10}}>
                    VIEW ALL
                  </Text>
                </View>
                {/* Statistics row - 4 items in a grid */}
                <View style={styles.statRowContainer}>
                  {profiledata?.statistics?.map((item, i) => (
                    <StatisticsItemComp
                      key={i}
                      icon={require('../../../images/icons/stat_earth_icon.png')}
                      statType={item?.title}
                      statValue={`${item?.value} kg CO2e `}
                    />
                  ))}
                </View>

                <View style={styles.rowHeaderContainer}>
                  <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                    My Badges
                  </Text>
                </View>
                {/* Badges section */}
                <View style={styles.badgeContainer}>
                  {profiledata?.myBadges?.map((item, i) => (
                    <BadgeComp
                      key={i}
                      badgeIcon={require('../../../images/icons/badge_green_eater.png')}
                      badgeName={item?.title}
                    />
                  ))}
                </View>

                <View style={styles.rowHeaderContainer}>
                  <Text style={{fontWeight: 'bold'}}>
                    Unfinished Challenges
                  </Text>
                </View>
                {/* Challenge component */}
                <View style={styles.challengeContainer}>
                  {profiledata?.unFinishedChallenges?.map((item, i) => (
                    <ChallengeComp
                      key={i}
                      icon={require('../../../images/icons/badge_green_eater.png')}
                      header={item?.header}
                      duration={item?.duration}
                      description={item?.description}
                    />
                  ))}
                </View>

                <View style={styles.rowHeaderContainer}>
                  <Text style={{fontWeight: 'bold'}}>
                    Your Family's Green Impact
                  </Text>
                </View>
                {/* Family's Green Impact section */}
                <View style={styles.lowerContainer}>
                  {/* Family statistics gradient card */}
                  <LinearGradient
                    colors={[Colors.LightGreen, Colors.DarkGreen]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.statContainer}>
                    <View style={styles.leftStat}>
                      <LeafIcon width={24} height={24} fill="white" />
                      <Text style={styles.statDescription}>TOTAL EMISSION</Text>
                      <Text style={styles.statTitle}>
                        {profiledata?.familyRecord?.totalEmissions} KG CO2e
                      </Text>
                    </View>
                    <Image
                      source={Verticaldevider}
                      style={styles.verticalDivider}
                    />
                    <View style={styles.leftStat}>
                      <LeafIcon width={24} height={24} fill="white" />
                      <Text style={styles.statDescription}>
                        TOP CONTRIBUTOR
                      </Text>
                      <Text style={styles.statTitle}>
                        {profiledata?.familyRecord?.topContributer}
                      </Text>
                    </View>
                  </LinearGradient>

                  {/* Family member card */}
                  {profiledata?.familyRecord?.familyList?.map((item, i) => {
                    return (
                      <View style={styles.card} key={i}>
                        <Image
                          source={AvatarPlaceholder}
                          style={styles.cardAvatar}
                        />
                        <Text style={styles.cardTitle}>{item?.name}</Text>
                        <Text style={styles.cardDescription}>
                          {item?.relation}
                        </Text>
                        <Image source={Divider} style={styles.cardDivider} />

                        {/* Points earned row */}
                        <View style={styles.cardPointsRow}>
                          <Text style={styles.cardPointsDescription}>
                            Points earned
                          </Text>
                          <View style={styles.cardPointsContainer}>
                            <Image
                              source={PointsIcon}
                              style={styles.pointsIcon}
                            />
                            <Text style={styles.cardPointsText}>
                              {item?.pointEarned} Pts
                            </Text>
                          </View>
                        </View>

                        {/* Emissions row */}
                        <View
                          style={[
                            styles.cardPointsRow,
                            styles.cardPointsRowSpacing,
                          ]}>
                          <Text style={styles.cardPointsDescription}>
                            Emission(CO2e)
                          </Text>
                          <View style={styles.cardPointsContainer}>
                            <Image
                              source={PointsIcon}
                              style={styles.pointsIcon}
                            />
                            <Text style={styles.cardPointsText}>
                              {item?.emissions} kg
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </SafeAreaView>
          </ImageBackground>
        )
      )}
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: 320,
    borderRadius: 400,
  },
  backgroundImageStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flex: 1,
  },
  // Fixed header section styles
  headerSection: {
    alignItems: 'center',
    paddingBottom: 20,
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
  // Scrollable content styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60, // Increased bottom padding to ensure all content is visible
    // alignItems: 'center',
    flexGrow: 1, // Ensures content can expand properly
  },
  rowHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
    // marginRight: 15,
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
    marginBottom: 10,
  },
  challengeContainer: {
    marginVertical: 10,
    // width: '100%',
    paddingHorizontal: 10,
  },
  lowerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginVertical: 20,
    textAlign: 'left',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
  leftStat: {
    flex: 1,
    alignItems: 'center',
  },

  verticalDivider: {
    width: 3,
    height: 60,
    marginHorizontal: 10,
  },
  statDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.White,
    marginTop: 8,
  },
  statTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
    marginTop: 4,
  },
  card: {
    width: '50%',
    backgroundColor: Colors.White,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 5,
    marginBottom: 20, // Added margin to ensure spacing from bottom
  },
  cardAvatar: {
    width: 60,
    height: 60,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.MediumGrey,
    textAlign: 'center',
    // marginBottom: 10,
  },
  cardDivider: {
    width: 100,
    height: 2,
    marginVertical: 5,
  },
  cardPointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardPointsRowSpacing: {
    marginTop: 8,
  },
  cardPointsDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: Colors.MediumGrey,
    flex: 1,
  },
  cardPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsIcon: {
    width: 12,
    height: 12,
  },
  cardPointsText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },
});
