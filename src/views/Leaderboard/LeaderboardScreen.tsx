import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/colors';
import WinnersCard from './Components/WinnersCard';
import CustomButton from '../../common/button';
import PodiumImage from '../../images/icons/winner_position_stand.png';
import WinnerCardOne from './Components/WinnerCardOne';
import WinnersCardThree from './Components/WinnerCardThree';
import ItemCard from './Components/ItemCard';
import {winnerTypeFilters} from '../../constants/constants';
import {DEVICE_WIDTH} from '../../utils/utils';
import {Header} from '../../common/header';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {leaderboardGet} from '../../features/leaderboard/leaderboardThunk';

// Student interface
interface Student {
  studentId: string;
  name: string;
  class: string;
  points: number;
  schoolRank: number;
  classRank: number;
}

const data = {
  leaderboard: {
    today: {
      school: [
        {
          studentId: 's3',
          name: 'Amit Singh',
          class: '9A',
          points: 50,
          schoolRank: 5,
          classRank: 4,
        },
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '8A',
          points: 60,
          schoolRank: 3,
          classRank: 2,
        },
        {
          studentId: 's2',
          name: 'Sam Karan',
          class: '10B',
          points: 55,
          schoolRank: 4,
          classRank: 3,
        },
        {
          studentId: '684a9e6b1174928225336ec2',
          name: 'Ravi Singh',
          class: '10B',
          points: 70,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's5',
          name: 'Neha Patel',
          class: '10B',
          points: 30,
          schoolRank: 2,
          classRank: 6,
        },
      ],
      class: [
        {
          studentId: 's3',
          name: 'Priya Verma',
          class: '10A',
          points: 55,
          schoolRank: 6,
          classRank: 5,
        },
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 45,
          schoolRank: 2,
          classRank: 2,
        },
        {
          studentId: 's2',
          name: 'Sam Karan',
          class: '10B',
          points: 55,
          schoolRank: 4,
          classRank: 3,
        },
        {
          studentId: '684a9e6b1174928225336ec2',
          name: 'Ravi Singh',
          class: '10B',
          points: 70,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's5',
          name: 'Neha Patel',
          class: '10B',
          points: 30,
          schoolRank: 2,
          classRank: 6,
        },
      ],
    },

    weekly: {
      school: [
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 320,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's3',
          name: 'Priya Verma',
          class: '10A',
          points: 310,
          schoolRank: 2,
          classRank: 2,
        },
        {
          studentId: 's4',
          name: 'Aman Yadav',
          class: '10B',
          points: 300,
          schoolRank: 3,
          classRank: 1,
        },
        {
          studentId: 's2',
          name: 'Ravi Kumar',
          class: '10B',
          points: 290,
          schoolRank: 4,
          classRank: 2,
        },
        {
          studentId: 's5',
          name: 'Neha Patel',
          class: '10C',
          points: 280,
          schoolRank: 5,
          classRank: 1,
        },
      ],
      class: [
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 320,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's3',
          name: 'Priya Verma',
          class: '10A',
          points: 310,
          schoolRank: 2,
          classRank: 2,
        },
        {
          studentId: 's6',
          name: 'Rohit Gupta',
          class: '10A',
          points: 270,
          schoolRank: 6,
          classRank: 3,
        },
        {
          studentId: 's7',
          name: 'Kavya Joshi',
          class: '10A',
          points: 260,
          schoolRank: 7,
          classRank: 4,
        },
        {
          studentId: 's8',
          name: 'Arjun Reddy',
          class: '10A',
          points: 250,
          schoolRank: 8,
          classRank: 5,
        },
      ],
    },

    monthly: {
      school: [
        {
          studentId: 's4',
          name: 'Aman Yadav',
          class: '10A',
          points: 1240,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's3',
          name: 'Priya Verma',
          class: '10B',
          points: 1220,
          schoolRank: 2,
          classRank: 1,
        },
        {
          studentId: 's5',
          name: 'Neha Singh',
          class: '10A',
          points: 1190,
          schoolRank: 3,
          classRank: 2,
        },
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 1180,
          schoolRank: 4,
          classRank: 3,
        },
        {
          studentId: 's2',
          name: 'Ravi Kumar',
          class: '10B',
          points: 1170,
          schoolRank: 5,
          classRank: 2,
        },
      ],
      class: [
        {
          studentId: 's4',
          name: 'Aman Yadav',
          class: '10A',
          points: 1240,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's5',
          name: 'Neha Singh',
          class: '10A',
          points: 1190,
          schoolRank: 3,
          classRank: 2,
        },
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 1180,
          schoolRank: 4,
          classRank: 3,
        },
        {
          studentId: 's6',
          name: 'Rohit Gupta',
          class: '10A',
          points: 1160,
          schoolRank: 6,
          classRank: 4,
        },
        {
          studentId: 's7',
          name: 'Kavya Joshi',
          class: '10A',
          points: 1150,
          schoolRank: 7,
          classRank: 5,
        },
      ],
    },

    allTime: {
      school: [
        {
          studentId: 's3',
          name: 'Priya Verma',
          class: '10B',
          points: 5120,
          schoolRank: 1,
          classRank: 1,
        },
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 5040,
          schoolRank: 2,
          classRank: 1,
        },
        {
          studentId: 's6',
          name: 'Karan Mehta',
          class: '10C',
          points: 4900,
          schoolRank: 3,
          classRank: 1,
        },
        {
          studentId: 's4',
          name: 'Aman Yadav',
          class: '10A',
          points: 4850,
          schoolRank: 4,
          classRank: 2,
        },
        {
          studentId: 's5',
          name: 'Neha Singh',
          class: '10B',
          points: 4800,
          schoolRank: 5,
          classRank: 2,
        },
      ],
      class: [
        {
          studentId: 's1',
          name: 'Ananya Sharma',
          class: '10A',
          points: 5040,
          schoolRank: 2,
          classRank: 1,
        },
        {
          studentId: 's4',
          name: 'Aman Yadav',
          class: '10A',
          points: 4850,
          schoolRank: 4,
          classRank: 2,
        },
        {
          studentId: 's7',
          name: 'Kavya Joshi',
          class: '10A',
          points: 4750,
          schoolRank: 6,
          classRank: 3,
        },
        {
          studentId: 's8',
          name: 'Arjun Reddy',
          class: '10A',
          points: 4700,
          schoolRank: 7,
          classRank: 4,
        },
        {
          studentId: 's9',
          name: 'Sneha Iyer',
          class: '10A',
          points: 4650,
          schoolRank: 8,
          classRank: 5,
        },
      ],
    },
  },
};

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'school' | 'class'>('school');
  const [activeFilter, setActiveFilter] = useState<string>('today');
  const [dataLoading, setDataLoading] = useState(false);
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();
  const itemWidth = (DEVICE_WIDTH - 16) * 0.2;
  const [student, setStudent] = useState<any>({});

  const dispatch = useAppDispatch();
  const leaderboardData = useAppSelector(
    state => state.leaderboard.leaderboard,
  );

  useEffect(() => {
    const getUser = async () => {
      const userData: any = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setStudent(user);
    };
    getUser();
  }, []);

  console.log('student', student);

  // Get filtered data based on activeTab and activeFilter
  // Get filtered data based on activeTab and activeFilter
  const getFilteredData = (): Student[] => {
    const filterKey = activeFilter as keyof typeof data.leaderboard;
    const tabKey = activeTab as 'school' | 'class';

    const filteredData = data.leaderboard[filterKey]?.[tabKey] || [];

    // Sort by appropriate rank (ascending order - rank 1 first)
    const sortedData = filteredData.sort((a, b) => {
      const rankA = activeTab === 'school' ? a.schoolRank : a.classRank;
      const rankB = activeTab === 'school' ? b.schoolRank : b.classRank;
      return rankA - rankB;
    });

    console.log('=== FILTERED DATA ===');
    console.log('Active Tab:', activeTab);
    console.log('Active Filter:', activeFilter);
    console.log('Filtered Students:', sortedData);
    console.log('Total Students:', sortedData.length);

    return sortedData;
  };

  // Get top 3 students for podium
  const getTop3Students = () => {
    const filteredData = getFilteredData();
    const top3 = filteredData.slice(0, 3);

    console.log('=== TOP 3 STUDENTS ===');
    console.log('1st Place:', top3[0] || 'No student');
    console.log('2nd Place:', top3[1] || 'No student');
    console.log('3rd Place:', top3[2] || 'No student');

    return {
      first: top3[0] || null,
      second: top3[1] || null,
      third: top3[2] || null,
    };
  };

  // Get remaining students (4th position onwards) for the list
  // Get remaining students (4th position onwards) for the list
  const getRemainingStudents = (): Student[] => {
    const filteredData = getFilteredData();
    const remaining = filteredData.slice(3);

    // Find the logged-in student from all filtered data
    const loggedInStudent = filteredData.find(
      user => user.studentId === student._id,
    );

    console.log('Logged in student:', loggedInStudent);

    // If logged-in student exists, always add them to the first position
    if (loggedInStudent) {
      // Remove logged-in student from remaining if they already exist there
      const filteredRemaining = remaining.filter(
        user => user.studentId !== student._id,
      );

      // Add logged-in student at first position
      const reorderedRemaining = [loggedInStudent, ...filteredRemaining];

      console.log('=== REMAINING STUDENTS (4th+) ===');
      console.log('Students with logged-in student first:', reorderedRemaining);
      console.log('Count:', reorderedRemaining.length);

      return reorderedRemaining;
    }

    console.log('=== REMAINING STUDENTS (4th+) ===');
    console.log('Students from 4th position:', remaining);
    console.log('Count:', remaining.length);

    return remaining;
  };

  const handleFilterChange = (selected: string) => {
    console.log('=== FILTER CHANGED ===');
    console.log('Previous Filter:', activeFilter);
    console.log('New Filter:', selected);

    setActiveFilter(selected);

    // Console the new filtered data after state update
    setTimeout(() => {
      console.log('Filter successfully changed to:', selected);
      getTop3Students();
      getRemainingStudents();
    }, 100);
  };

  // Handle tab change
  const handleTabChange = (tab: 'school' | 'class') => {
    console.log('=== TAB CHANGED ===');
    console.log('Previous Tab:', activeTab);
    console.log('New Tab:', tab);

    setActiveTab(tab);

    // Console the new filtered data after state update
    setTimeout(() => {
      console.log('Tab successfully changed to:', tab);
      getTop3Students();
      getRemainingStudents();
    }, 100);
  };

  const renderTabItem = (item: string, index: number) => {
    const isActive = activeFilter === item;
    return (
      <TouchableOpacity
        onPress={() => handleFilterChange(item)}
        key={index}
        style={{
          marginRight: 10,
          width: itemWidth,
          paddingVertical: 8,
          borderRadius: 20,
          alignItems: 'center',
          backgroundColor: isActive ? Colors.Black : Colors.Neutrals100,
        }}>
        <Text style={{color: isActive ? Colors.White : Colors.Black}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(leaderboardGet()).unwrap();
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData = !leaderboardData;
    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  // Get the current filtered data
  const top3Students = getTop3Students();
  const remainingStudents = getRemainingStudents();

  return (
    <>
      {dataLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#23B397" />
        </View>
      ) : (
        <LinearGradient
          colors={[Colors.LightGreen, Colors.DarkGreen]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.container}>
          <Header
            title="Leaderboard"
            onBackClick={() => {
              navigation.goBack();
            }}
          />

          <View style={styles.mainContainer}>
            <View style={styles.btnContainer}>
              <View style={styles.btn}>
                <CustomButton
                  text="School Rank"
                  backgroundColor={
                    activeTab === 'school' ? Colors.White : 'transparent'
                  }
                  textColor={
                    activeTab === 'school' ? Colors.NeutralsDark : Colors.White
                  }
                  borderColor={Colors.White}
                  borderWidth={1}
                  onPress={() => handleTabChange('school')}
                />
              </View>
              <View style={styles.btn}>
                <CustomButton
                  text={`Class Rank (${student?.class} ${student?.section})`}
                  backgroundColor={
                    activeTab === 'class' ? Colors.White : 'transparent'
                  }
                  textColor={
                    activeTab === 'class' ? Colors.NeutralsDark : Colors.White
                  }
                  borderColor={Colors.White}
                  borderWidth={1}
                  onPress={() => handleTabChange('class')}
                />
              </View>
            </View>

            {/* Top Winners Section - Now using filtered data */}
            <View style={styles.winnersWrapper}>
              <View style={styles.winnerRow}>
                {/* 2nd Place */}
                <View style={[styles.winnerContainer, {top: 20}]}>
                  <WinnersCard student={top3Students.second} />
                </View>
                {/* 1st Place */}
                <View style={[styles.winnerContainer, {top: -15}]}>
                  <WinnerCardOne student={top3Students.first} />
                </View>
                {/* 3rd Place */}
                <View style={[styles.winnerContainer, {top: 30}]}>
                  <WinnersCardThree student={top3Students.third} />
                </View>
              </View>
              <Image source={PodiumImage} style={styles.podiumImage} />
            </View>

            {/* Scrollable FlatList Section - Now using remaining students */}
            <View style={styles.winnersCardWrapper}>
              <View style={styles.tabContainer}>
                <FlatList
                  horizontal
                  data={winnerTypeFilters}
                  renderItem={({item, index}) => renderTabItem(item, index)}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              <FlatList
                data={remainingStudents}
                renderItem={({item, index}) => (
                  <ItemCard
                    student={item}
                    index={index} // 4th position onwards
                    rank={
                      activeTab === 'school' ? item.schoolRank : item.classRank
                    }
                  />
                )}
                keyExtractor={(item, index) => `${item.studentId}-${index}`}
                contentContainerStyle={{paddingBottom: 250}}
                style={{maxHeight: 350}}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No more students to display
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 6,
    paddingHorizontal: 10,
  },
  btn: {
    width: '49%',
  },
  winnersWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  winnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
  },
  winnerContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  podiumImage: {
    width: '87%',
    height: 160,
    resizeMode: 'contain',
  },
  winnersCardWrapper: {
    backgroundColor: Colors.White,
    width: '100%',
    padding: 5,
    borderRadius: 20,
    marginTop: -15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.Neutrals100,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.NeutralsDark,
    textAlign: 'center',
  },
});

export default Leaderboard;
