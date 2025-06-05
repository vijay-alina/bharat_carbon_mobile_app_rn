import React, {useState} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DEVICE_WIDTH} from '../../../utils/utils';
import {Colors} from '../../../constants/colors';
import {
  activities,
  activityTabs,
  dropdownItems,
  sampleEvents,
} from '../../../constants/constants';
import {Header} from '../../../common/header';
import Dropdown from '../../../components/Dropdown';
import ActivityComp, {ActivityType} from './ActivityComp';
import Calendar from '../../../components/Calendar';
import { useNavigation } from '@react-navigation/native';

const ActivitiesScreen: React.FC = () => {
    const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState<string>(
    dropdownItems[0],
  );

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleActivityChange = (item: string) => {
    setSelectedActivity(item);
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

  const renderItem = ({item, index}) => (
    <ActivityComp
      key={index}
      activityType={getActivityType(item.activityType)}
      header={item.title}
      subHeader={item.timestamp}
      name={item.name}
    />
  );

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.sectionHeader}>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No contacts found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Activities" isHomeScreen={true} onBackClick={() => {
        navigation.goBack();
      }} />
      <View style={styles.tabsContainer}>
        {activityTabs.map((tab, i) => {
          const isActive = i === activeTab;
          return (
            <TouchableOpacity
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
        <>
          <View style={styles.dropdownContainer}>
            <Dropdown
              data={dropdownItems}
              onSelect={item => handleActivityChange(item as string)}
              selectedValue={selectedActivity}
            />
          </View>
          <SectionList
            sections={activities}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmpty}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </>
      ) : (
        <>
          <Calendar events={sampleEvents} />
          {/* <FlatList data={activities[0].data} renderItem={renderItem} /> */}
        </>
      )}
    </View>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.9,
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
    paddingVertical: 10,
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
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '400',
    color: Colors.Neutrals500,
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
  },
  headerTextWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: Colors.White,
  },
  dropdownContainer: {
    marginTop: 8,
    marginLeft: 16,
  },
});
