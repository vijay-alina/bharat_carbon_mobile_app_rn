import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  FlatList,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {DEVICE_WIDTH} from '../../../utils/utils';
import {Colors} from '../../../constants/colors';
import {
  // activities,
  activityTabs,
  dropdownItems,
  // monthActivities,
} from '../../../constants/constants';
import {Header} from '../../../common/header';
import Dropdown from '../../../components/Dropdown';
import ActivityComp, {ActivityType} from './ActivityComp';
import Calendar from '../../../components/Calendar';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {
  activityGet,
  monthlyActivityGet,
} from '../../../features/activities/activityThunks';
// import { monthWiseGetActivitiesList } from '../../../services/activitiesService';

const ITEMS_PER_PAGE = 20;

const ActivitiesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const sectionListRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<string>(
    dropdownItems[0],
  );

  // Get current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Pagination states for activities tab only
  const [activitiesState, setActivitiesState] = useState<any>({
    currentPage: 1,
    data: [],
    isLoading: false,
    hasMoreData: true,
    isLoadingMore: false,
    isInitialized: false,
  });

  // No pagination for month activities
  const [monthActivitiesState, setMonthActivitiesState] = useState<any>({
    data: [],
    isLoading: false,
    isInitialized: false,
  });

  const dispatch = useAppDispatch();
  const activitiesData = useAppSelector(state => state.activities.activities);
  const monthlyActivitiesData = useAppSelector(
    state => state.activities.monthlyActivities,
  );

  // Function to get month name from date
  const getMonthName = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Function to format date for grouping
  const formatDateForGrouping = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Function to simulate API call for activities (with pagination)
  const fetchActivities = useCallback(
    async (page: number, isInitial: boolean = false) => {
      setActivitiesState((prev: any) => ({
        ...prev,
        isLoading: isInitial,
        isLoadingMore: !isInitial,
      }));

      console.log('fetchActivities called ', page, isInitial);
      try {
        // Simulate API delay
        const response = await dispatch(
          activityGet({
            page,
            limit: ITEMS_PER_PAGE,
            activityType: selectedActivity,
          }),
        ).unwrap();

        // Calculate pagination for regular activities
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        setActivitiesState((prev: any) => ({
          ...prev,
          data: isInitial ? response.data : [...prev.data, ...response.data],
          currentPage: page,
          hasMoreData: endIndex < response.totalLength,
          isLoading: false,
          isLoadingMore: false,
          isInitialized: true,
        }));
      } catch (error) {
        console.error('Error fetching activities:', error);
        Alert.alert('Error', 'Failed to load activities');
        setActivitiesState((prev: any) => ({
          ...prev,
          isLoading: false,
          isLoadingMore: false,
        }));
      }
    },
    [selectedActivity, dispatch],
  );

  // Function to simulate API call for month activities (without pagination)
  const fetchMonthActivities = useCallback(async () => {
    setMonthActivitiesState((prev: any) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      // Simulate API delay
      const response = await dispatch(monthlyActivityGet()).unwrap();

      setTimeout(() => {
        setMonthActivitiesState((prev: any) => ({
          ...prev,
          data: response.data,
          isLoading: false,
          isInitialized: true,
        }));
      }, 1000);

      // setMonthActivitiesState((prev: any) => ({
      //   ...prev,
      //   data: response.data, // Load all data at once
      //   isLoading: false,
      //   isInitialized: true,
      // }));
    } catch (error) {
      console.error('Error fetching month activities:', error);
      Alert.alert('Error', 'Failed to load month activities');
      setMonthActivitiesState((prev: any) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [selectedMonth, selectedYear]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleActivityChange = (item: string) => {
    if (item === selectedActivity) return;
    console.log('Selected activity change call', item);
    setActivitiesState({
      currentPage: 1,
      data: [],
      isLoading: true,
      hasMoreData: true,
      isLoadingMore: false,
      isInitialized: false,
    });
    setSelectedActivity(item);
  };

  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // Handle load more data (only for activities tab)
  const handleLoadMore = useCallback(() => {
    // Only handle pagination for activities tab (activeTab === 0)
    if (activeTab !== 0) return;

    setActivitiesState((prev: any) => {
      if (!prev.isLoadingMore && prev.hasMoreData && !prev.isLoading) {
        const nextPage = prev.currentPage + 1;
        fetchActivities(nextPage);
        return {
          ...prev,
          isLoadingMore: true,
        };
      }
      return prev;
    });
  }, [activeTab, fetchActivities]);

  // Group activities by month for regular activities tab
  const groupActivitiesByMonth = (activitiesData: any[]) => {
    if (!activitiesData || activitiesData.length === 0) {
      return [];
    }

    const grouped = activitiesData.reduce((acc, activity) => {
      const monthKey = getMonthName(activity.timestamp);
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(activity);
      return acc;
    }, {});

    // Sort months chronologically (oldest first)
    const sortedMonths = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(grouped[a][0].timestamp);
      const dateB = new Date(grouped[b][0].timestamp);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedMonths.map(month => ({
      title: month,
      data: grouped[month].sort((a: any, b: any) => {
        // Sort activities within each month by date (oldest first)
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }),
    }));
  };

  // Group activities by date for month activities tab
  const groupActivitiesByDate = (activitiesData: any[]) => {
    const grouped = activitiesData
      ? activitiesData.reduce((acc: any, activity: any) => {
          const dateKey = formatDateForGrouping(activity.timestamp);
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(activity);
          return acc;
        }, {})
      : {};

    // Sort dates chronologically (oldest first)
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(grouped[a][0].timestamp);
      const dateB = new Date(grouped[b][0].timestamp);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedDates.map(date => {
      const activitiesForDate = grouped[date].sort((a: any, b: any) => {
        // Sort activities within each date by timestamp (oldest first)
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });

      // Extract unique events (colors) for this date
      const uniqueEvents = activitiesForDate.reduce(
        (eventAcc: any[], activity: any) => {
          if (activity.events && activity.events.color) {
            // Check if this color already exists in the events array
            const colorExists = eventAcc.some(
              event => event.color === activity.events.color,
            );
            if (!colorExists) {
              eventAcc.push({
                color: activity.events.color,
                type: activity.events.type || 'dot',
              });
            }
          }
          return eventAcc;
        },
        [],
      );

      // Extract date number from the first activity
      const dateNumber = activitiesForDate[0]?.date || 0;

      return {
        title: date,
        date: dateNumber,
        events: uniqueEvents,
        data: activitiesForDate,
      };
    });
  };

  const getActivityType = (activityType: string) => {
    switch (activityType) {
      case 'Nutrition':
        return ActivityType.Nutrition;
      case 'Mobility':
        return ActivityType.Mobility;
      case 'Housing':
        return ActivityType.Housing;
      case 'Leisure':
        return ActivityType.Leisure;
      case 'Goods':
        return ActivityType.Goods;
      default:
        return ActivityType.Nutrition;
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <ActivityComp
        key={`${item.id}-${index}`}
        activityType={getActivityType(item.activityType)}
        header={item.title}
        subHeader={item.timestamp}
        name={item.name}
        item={item}
      />
    );
  };

  // Section header for regular activities (grouped by month)
  const renderSectionHeader = ({
    section: {title, data},
  }: {
    section: {title: string; data: any[]};
  }) => {
    if (!title || !data || data.length === 0) return null;

    return (
      <View style={styles.sectionHeader}>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
          <Text style={styles.activityCountText}>
            {data.length} {data.length === 1 ? 'activity' : 'activities'}
          </Text>
        </View>
      </View>
    );
  };

  // Section header for month activities (grouped by date)
  const renderSectionHeaderTime = ({
    section: {title, data},
  }: {
    section: {title: string; data: any[]};
  }) => {
    if (!title || !data || data.length === 0) return null;

    return (
      <View style={styles.secSectionHeader}>
        <View style={styles.timestampHeaderContainer}>
          <Text style={styles.secSectionHeaderText}>{title}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    // Only show footer loader for activities tab
    console.log('render Loading more activities...', activitiesState);
    if (activeTab !== 0) return null;

    const currentState = activitiesState;

    if (!currentState.isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.ThickGreenShades700} />
        <Text style={styles.loadingText}>Loading more activities...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    console.log('Loading activities...', activitiesState);
    const currentState =
      activeTab === 0 ? activitiesState : monthActivitiesState;

    if (currentState.isLoading || !currentState.isInitialized) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.ThickGreenShades700} />
          <Text style={styles.loadingText}>Loading activities...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {activeTab === 0 &&
          selectedActivity !== 'All' &&
          selectedActivity !== dropdownItems[0]
            ? `No ${selectedActivity} activities found`
            : 'No activities found'}
        </Text>
      </View>
    );
  };

  const currentData =
    activeTab === 0 ? activitiesState.data : monthActivitiesState.data;

  // Use different grouping functions based on active tab
  const sectionsData: any =
    activeTab === 0
      ? groupActivitiesByMonth(currentData)
      : groupActivitiesByDate(currentData);

  // Load initial data only when needed
  useEffect(() => {
    if (activeTab === 0 && !activitiesState.isInitialized) {
      fetchActivities(1, true);
    } else if (activeTab === 1 && !monthActivitiesState.isInitialized) {
      fetchMonthActivities();
    }
  }, [activeTab]);

  // Handle filter changes for activities tab
  useEffect(() => {
    console.log('useEffct call', activitiesState);
    if (activeTab === 0) {
      fetchActivities(1, true);
    }
  }, [selectedActivity]);

  // Handle month/year changes for month activities tab
  useEffect(() => {
    if (activeTab === 1) {
      setMonthActivitiesState((prev: any) => ({
        ...prev,
        data: [],
        isInitialized: false,
      }));
      fetchMonthActivities();
    }
  }, [selectedMonth, selectedYear]);

  const handleEndReached = () => {
    // Only handle end reached for activities tab
    if (activeTab !== 0 || !activitiesState.isInitialized) return;
    handleLoadMore();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Activities"
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
      <View style={styles.contentContainer}>
        <View style={styles.tabsContainer}>
          {activityTabs.map((tab, i) => {
            const isActive = i === activeTab;
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive
                      ? Colors.ThickGreenShades700
                      : Colors.White,
                  },
                ]}
                onPress={() => handleTabChange(i)}>
                {isActive ? tab.icons[0] : tab.icons[1]}
                <Text
                  style={[
                    styles.tabText,
                    {color: isActive ? Colors.White : Colors.Black},
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === 0 ? (
          <View style={styles.sectionListContainer}>
            <View style={styles.dropdownContainer}>
              <Dropdown
                data={dropdownItems}
                onSelect={item => handleActivityChange(item as string)}
                selectedValue={selectedActivity}
              />
            </View>
            <SectionList
              key={selectedActivity}
              ref={sectionListRef}
              sections={sectionsData}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              stickySectionHeadersEnabled={true}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.listContent}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.3}
              removeClippedSubviews={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              style={styles.sectionList}
            />
          </View>
        ) : (
          <View style={styles.sectionListContainer}>
            <Calendar
              events={sectionsData}
              onMonthChange={handleMonthChange}
              initialMonth={selectedMonth}
              initialYear={selectedYear}
            />
            <SectionList
              sections={sectionsData}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeaderTime}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              stickySectionHeadersEnabled={true}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.listContent}
              // onEndReached={handleEndReached}
              // onEndReachedThreshold={0.3}
              // removeClippedSubviews={false}
              // initialNumToRender={10}
              // maxToRenderPerBatch={10}
              // windowSize={10}
              style={styles.sectionList}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 24,
  },
  tab: {
    flexDirection: 'row',
    width: '50%',
    borderRadius: 12,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  sectionList: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: Colors.Black,
    textAlign: 'center',
  },
  activityCountText: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    color: Colors.Neutrals500,
    textAlign: 'center',
    marginTop: 4,
  },
  secSectionHeader: {
    marginTop: 16,
    // paddingHorizontal: 20,
    paddingVertical: 12,
    // backgroundColor: Colors.White,
    borderRadius: 8,
    marginHorizontal: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  secSectionHeaderText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: Colors.Black,
  },
  timestampHeaderContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dateEventsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    color: Colors.Neutrals500,
    marginRight: 8,
  },
  eventsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
  },
  dropdownContainer: {
    marginBottom: 8,
    marginTop: 8,
    width: '100%',
    alignSelf: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemContent: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemPhone: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  headerTextWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Colors.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionListContainer: {
    flex: 1,
    marginBottom: 16,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.Neutrals500,
    fontFamily: 'Montserrat',
  },
});
