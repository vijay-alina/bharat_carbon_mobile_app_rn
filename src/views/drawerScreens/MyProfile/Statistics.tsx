import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../../common/header';
import PieChartScreen from './PieChartScreen';
import DualCircularProgress from './DualCirculScreen';
import LineChartScreen from './LineChartScreen';
import GoalTrackingCard from './GoalTrackingCard';
import {RootStackParamList} from '../../../navigations/rootStackNavigator';
import {Colors} from '../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {statisticsdataGet} from '../../../features/myProfile/myProfileThunks';
import {useSelector} from 'react-redux';
type ServicesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Services'
>;

const StatisticsScreen = () => {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const navigation = useNavigation<ServicesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const statisticsData = useAppSelector(state => state.myProfile.statistics);

  const handlePress = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    setLoadingData(true);
    try {
      await dispatch(statisticsdataGet()).unwrap();
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!statisticsData) {
      fetchData();
    } else {
      setLoadingData(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {loadingData ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#23B397" />
        </View>
      ) : (
        statisticsData && (
          <>
            <Header title="Family Overview" onBackClick={handlePress} />

            <ScrollView contentContainerStyle={styles.content}>
              <Text style={styles.heading}>Your Impact Stats</Text>
              <Text style={styles.headingSub}>
                Track your eco journey in real-time, stay inspired by your
                progress.
              </Text>

              <DualCircularProgress
                ChallengeOverview={statisticsData?.ChallengeOverview}
              />
              <GoalTrackingCard goalTracking={statisticsData?.goalTracking} />
              <LineChartScreen growtgGraph={statisticsData?.growtgGraph} />
              <PieChartScreen
                ecoImpact={statisticsData?.ecoImpact}
                totalPoints={statisticsData?.goalTracking?.totalPoints}
              />
            </ScrollView>
          </>
        )
      )}
    </View>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    backgroundColor: Colors.bodyBackground,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  headingSub: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 20,
  },
});
