import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header} from '../../common/header';
import {
  ClassRankGreenIcon,
  SchoolRankGreenIcon,
  SchoolRankIcon,
  Vactor,
  GroupIcon,
  GroupIcons,
} from '../../images/icons';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {familyLeaderboardGet} from '../../features/leaderboard/leaderboardThunk';
import {
  FamilyLeaderboardData,
  LeaderboardStudent,
} from '../../features/leaderboard/leaderboardType';

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <View style={styles.infoRow}>
    {Icon && <Icon width={16} height={16} style={styles.iconSpacing} />}
    <Text style={styles.cardSubtitel}>{label}</Text>
    <Text style={styles.cardSubtitelItem}>{value}</Text>
  </View>
);

type TabKey = keyof FamilyLeaderboardData;
const tabs: TabKey[] = ['today', 'weekly', 'monthly', 'allTime'];

const FamilyLeaderboardScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('today');
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const [rank, setRank] = useState<any>();
  const [dataLoading, setDataLoading] = useState(false);

  const leaderboardData = useAppSelector(
    state => state.leaderboard.familyLeaderboard,
  );

  //   const openModal = () => setIsModalVisible(true);
  //   const closeModal = () => setIsModalVisible(false);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(familyLeaderboardGet()).unwrap();
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
  };

  // Fetch data on mount if not already present
  useEffect(() => {
    if (!leaderboardData) {
      fetchData();
    }
  }, []);

  // Update rank when leaderboardData or activeTab changes
  useEffect(() => {
    if (leaderboardData?.leaderboard) {
      const data = leaderboardData.leaderboard[activeTab];
      setRank(data);
    }
  }, [leaderboardData, activeTab]);

  return (
    <>
      {dataLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#23B397" />
        </View>
      ) : (
        leaderboardData && (
          <View style={{flex: 1, backgroundColor: '#F4F6F8'}}>
            <Header
              title="Leaderboard"
              onBackClick={() => navigation.goBack()}
            />
            <ScrollView
              contentContainerStyle={styles.container}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Text style={styles.title}>Leaderboard</Text>
              <Text style={styles.subtitle}>
                Track your student’s progress and celebrate green achievements.
              </Text>

              {/* Student Details Card */}
              <View style={styles.card}>
                <Text style={styles.cardtitle}>Student Details</Text>
                <InfoRow
                  icon={Vactor}
                  label="Student Name: "
                  value={
                    leaderboardData?.student?.firstName +
                    ' ' +
                    leaderboardData?.student?.lastName
                  }
                />
                <InfoRow
                  icon={SchoolRankGreenIcon}
                  label="School: "
                  value="Green Valley Public School"
                />
                <InfoRow
                  icon={ClassRankGreenIcon}
                  label="Class: "
                  value={
                    leaderboardData?.student?.class.toString() +
                    '-' +
                    leaderboardData?.student?.section
                  }
                />
              </View>

              {/* Rank Summary Card */}
              <View style={styles.card}>
                <Text style={styles.cardtitle}>Rank Summary</Text>

                {/* Tabs */}
                <View style={styles.tabContainer}>
                  {tabs.map(tab => (
                    <Text
                      key={tab}
                      style={[
                        styles.tabItem,
                        activeTab === tab && styles.activeTabItem,
                      ]}
                      onPress={() => handleTabChange(tab)}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  ))}
                </View>

                {/* Rank Boxes */}
                <View style={styles.rowContainer}>
                  <View style={styles.cardBox}>
                    <SchoolRankIcon
                      width={18}
                      height={18}
                      style={{marginBottom: 6}}
                    />
                    <Text style={styles.cardText}>School Rank</Text>
                    <Text style={styles.cardText}>
                      #{rank?.school?.schoolRank ?? '--'}
                    </Text>
                  </View>
                  <View style={styles.cardBox}>
                    <GroupIcon
                      width={18}
                      height={18}
                      color="white"
                      style={{marginBottom: 6}}
                    />
                    <Text style={styles.cardText}>Class Rank</Text>
                    <Text style={styles.cardText}>
                      #{rank?.class?.classRank ?? '--'}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )
      )}
    </>
  );
};

export default FamilyLeaderboardScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 60,
    backgroundColor: '#F4F6F8',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },

  cardtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },

  cardSubtitel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginRight: 4,
  },

  cardSubtitelItem: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E6EAF0',
    borderRadius: 25,
    marginBottom: 16,
    // padding: 4,
  },

  tabItem: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    borderRadius: 20,
  },

  activeTabItem: {
    backgroundColor: '#17A086',
    color: '#fff',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  cardBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#17A086',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginVertical: 2,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },

  iconSpacing: {
    marginRight: 8,
  },

});
