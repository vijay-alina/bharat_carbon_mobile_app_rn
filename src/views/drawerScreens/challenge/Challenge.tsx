import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Header} from '../../../common/header';
import {useNavigation} from '@react-navigation/native';
import ChallengeCard from './ChallengeCard';
import {challengesStatus} from '../../../constants/constants';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {ChallengeStatusWiseList} from '../../../features/manageChallege/manageChallengeThunks';
import {Colors} from '../../../constants/colors';

const Data_Per_Page = 10;

const ChallengeScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = React.useState('ongoing');
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const ongoingChallengeList = useAppSelector(
    state => state.manageChallenge.ongoingChallengeList,
  );
  const completedChallengeList = useAppSelector(
    state => state.manageChallenge.completedChallengeList,
  );
  const notCompletedChallengeList = useAppSelector(
    state => state.manageChallenge.notCompletedCahallengeList,
  );
  const totalLengthOngoingChallenge = useAppSelector(
    state => state.manageChallenge.totalLengthOngoingChallenge,
  );
  const totalLengthCompletedChallenge = useAppSelector(
    state => state.manageChallenge.totalLengthCompletedChallenge,
  );
  const totalLengthNotCompletedChallenge = useAppSelector(
    state => state.manageChallenge.totalLengthNotCompletedChallenge,
  );

  const fetchData = async (page: number, status: string) => {
    if (page === 1) {
      setLoading(true);
    }
    const param = {
      page: page,
      status: status,
    };
    try {
      await dispatch(ChallengeStatusWiseList(param)).unwrap();
      setPage(page + 1);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    let isFetched = false;
    if (tab === 'ongoing') {
      isFetched = ongoingChallengeList.length > 0;
    } else if (tab === 'completed') {
      isFetched = completedChallengeList.length > 0;
    } else {
      isFetched = notCompletedChallengeList.length > 0;
    }
    if (!isFetched) {
      fetchData(page, tab);
    }
  };

  //   const renderEmpty = () => {
  //     console.log('renderEmpty');
  //     if (loading) {
  //       return (
  //         <View style={styles.emptyContainer}>
  //           <ActivityIndicator size="large" color={Colors.ThickGreenShades700} />
  //           <Text style={styles.loadingText}>Loading activities...</Text>
  //         </View>
  //       );
  //     }

  //     return (
  //       <View style={styles.emptyContainer}>
  //         <Text style={styles.emptyText}>No Activity Found</Text>
  //       </View>
  //     );
  //   };

  const renderFooter = () => {
    if (
      activeTab === 'ongoing' &&
      ongoingChallengeList.length < totalLengthOngoingChallenge
    ) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.ThickGreenShades700} />
          <Text style={styles.loadingText}>Loading more activities...</Text>
        </View>
      );
    } else if (
      activeTab === 'completed' &&
      completedChallengeList.length < totalLengthCompletedChallenge
    ) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.ThickGreenShades700} />
          <Text style={styles.loadingText}>Loading more activities...</Text>
        </View>
      );
    } else if (
      activeTab === 'notCompleted' &&
      notCompletedChallengeList.length < totalLengthNotCompletedChallenge
    ) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.ThickGreenShades700} />
          <Text style={styles.loadingText}>Loading more activities...</Text>
        </View>
      );
    }
  };

  const handleEndReached = () => {
    if (
      activeTab === 'ongoing' &&
      ongoingChallengeList.length < totalLengthOngoingChallenge
    ) {
      fetchData(page, activeTab);
    } else if (
      activeTab === 'completed' &&
      completedChallengeList.length < totalLengthCompletedChallenge
    ) {
      fetchData(page, activeTab);
    } else if (
      activeTab === 'notCompleted' &&
      notCompletedChallengeList.length < totalLengthNotCompletedChallenge
    ) {
      fetchData(page, activeTab);
    }
  };

  useEffect(() => {
    const isFetched = ongoingChallengeList.length > 0;
    if (!isFetched) {
      fetchData(page, activeTab);
    }
  }, []);

  console.log('ongoingChallengeList', ongoingChallengeList);
  console.log('completedChallengeList', completedChallengeList);
  console.log('notCompletedChallengeList', notCompletedChallengeList);

  const renderData =
    activeTab === 'ongoing'
      ? ongoingChallengeList
      : activeTab === 'completed'
      ? completedChallengeList
      : notCompletedChallengeList;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Challenges"
        isHomeScreen={true}
        onHomeClick={() => {
          navigation.navigate('MainTabs', {
            screen: 'Home',
          });
        }}
        onBackClick={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.innerContainer}>
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'ongoing' ? styles.activeTabButton : null,
              ]}
              onPress={() => handleTabChange('ongoing')}>
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === 'ongoing' ? styles.activeTabText : null,
                ]}>
                Ongoing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'completed' ? styles.activeTabButton : null,
              ]}
              onPress={() => handleTabChange('completed')}>
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === 'completed' ? styles.activeTabText : null,
                ]}>
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'notCompleted' ? styles.activeTabButton : null,
              ]}
              onPress={() => handleTabChange('notCompleted')}>
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === 'notCompleted' ? styles.activeTabText : null,
                ]}>
                Not Completed
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.ThickGreenShades700}
            />
            <Text style={styles.loadingText}>Loading activities...</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={renderData}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ChallengeCard
                  icon={item.icon}
                  header={item.header}
                  duration={item.duration}
                  description={item.description}
                  color={item.color}
                  points={item.points}
                  completedDays={item.completedDays}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No activities found.</Text>
                </View>
              )}
              onEndReached={handleEndReached}
              ListFooterComponent={renderFooter}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 50,
  },
  innerContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.Neutrals500,
    fontFamily: 'Montserrat',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  activeTabButton: {
    backgroundColor: '#000',
  },
  tabIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  activeTabText: {
    color: '#fff',
  },
});

export default ChallengeScreen;
