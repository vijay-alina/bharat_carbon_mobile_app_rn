import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  BackHandler,
} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';
import {PointsCard} from './component/PointsDateCard';
import {DayProgress} from './component/DayProgress';
import {Header} from '../../common/header';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import WaterSave from '../../images/icons/tap_icon.png';
import Svg, {Text as SvgText} from 'react-native-svg';
import {useAppSelector} from '../../hooks/hooks';

const OngoingChallengeScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {challengeType, challengeData, days} = route.params as {
    challengeType: string;
    challengeData: any;
    days: number;
  };
  const ongoingChallenge: any = useAppSelector(
    state => state.manageChallenge.ongoingChallenge,
  );

  console.log('ongoingChallenge', ongoingChallenge[0]?.startDate);

  const startDate = new Date(ongoingChallenge[0]?.startDate);
  const currentDate = new Date();

  // Convert both dates to UTC midnight to avoid partial day mismatches
  const utcStart = Date.UTC(
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate(),
  );
  const utcNow = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
  );

  // Calculate difference in days
  const diffInDays = Math.floor((utcNow - utcStart) / (1000 * 60 * 60 * 24));

  console.log('Days completed:', diffInDays);

  const filledDataDays = ongoingChallenge[0]?.challengeRecord?.length || 0;

  console.log('filledDataDays', filledDataDays);

  const progress = filledDataDays / days;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleBack = () => {
    navigation.navigate('ChallengeList', {
      challengeType,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (Platform.OS === 'android') {
          handleBack();
          return true; // prevent default behavior
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, []),
  );

  console.log('ongoing challenge', ongoingChallenge);
  console.log('ongoing challengeData', challengeData);
  console.log('ongoing challengeType', challengeType);

  return (
    <View style={styles.container}>
      {/* Fixed-looking Header */}
      <View style={styles.headerWrapper}>
        <Header
          title="Ongoing Challenge"
          onBackClick={() => {
            navigation.navigate('ChallengeList', {
              challengeType,
            });
          }}
          isHomeScreen={true}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>
          {days}-Days {challengeData?.title}
        </Text>

        {/* Progress Bar */}
        <DayProgress
          currentDay={diffInDays + 1}
          totalDays={days}
          ongoingChallenge={ongoingChallenge}
        />

        <View style={styles.cardSection}>
          {/* Card Section */}
          <PointsCard
            points={`+${ongoingChallenge[0]?.point} points`}
            startDate={formatDate(ongoingChallenge[0]?.startDate)}
            endDate={formatDate(ongoingChallenge[0]?.endDate)}
          />

          <Image
            source={challengeData.image}
            style={styles.icon}
            resizeMode="contain"
          />

          {/* Progress Circle */}
          <View style={styles.progressContainer}>
            <View style={{height: 50, width: 50}}>
              <ProgressCircle
                style={{height: 50, width: 50}}
                progress={progress}
                progressColor="#4CAF50"
                backgroundColor="#E0E0E0"
                strokeWidth={4}
              />
              <Svg
                height="50"
                width="50"
                style={[StyleSheet.absoluteFill, {left: 4}]}>
                <SvgText
                  x="25"
                  y="30"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#000"
                  fontWeight="bold">
                  {`${Math.round(progress * 100)}%`}
                </SvgText>
              </Svg>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.textSection}>
          <Text style={styles.heading}>Do:</Text>
          <Text>{ongoingChallenge[0]?.tips?.Do}</Text>

          <Text style={styles.heading}>Avoid:</Text>
          <Text>{ongoingChallenge[0]?.tips?.Avoid}</Text>

          <Text style={styles.heading}>Focus on:</Text>
          <Text>{ongoingChallenge[0]?.tips?.Focus}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8D9DD',
  },
  headerWrapper: {
    zIndex: 10,
    elevation: 5,
    ...Platform.select({
      android: {backgroundColor: 'transparent'},
      ios: {},
    }),
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
  },

  cardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  icon: {
    width: '50%',
    height: 250,
    marginLeft: 5,
    marginBottom: 24,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textSection: {
    marginVertical: 16,
  },
  heading: {
    fontWeight: 'bold',
    marginTop: 12,
  },
});

export default OngoingChallengeScreen;
