import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import * as Progress from 'react-native-progress';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {getAnalyticsCategoryWiseData} from '../../../features/analytics/analyticsThunks';
import {
  AnalyticsCategory,
  SubCategoryItem,
} from '../../../features/analytics/analyticsType';

// interface SubCategoryItem {
//   _id: string;
//   subCategory: string;
//   amount: number;
//   color: string;
//   percent: number;
// }

// interface EmissionItem {
//   category: string;
//   icon: string; // Emoji or image placeholder
//   color: string;
//   amount: number;
//   percent: number;
//   timeRange: string;
//   subCategoryItem: SubCategoryItem[];
// }

// const data: EmissionItem[] = [
//   {
//     category: 'Nutrition',
//     icon: '🍏',
//     color: '#4CAF50',
//     amount: 7.2,
//     percent: 35.5,
//     timeRange: 'Jan to Apr 2025',
//     subCategoryItem: [
//       {
//         _id: '1',
//         subCategory: 'Fruits',
//         amount: 3.6,
//         color: '#4CAF50',
//         percent: 17.7,
//       },
//       {
//         _id: '2',
//         subCategory: 'Vegetables',
//         amount: 3.6,
//         color: '#4CAF50',
//         percent: 17.7,
//       },
//     ],
//   },
//   {
//     category: 'Housing',
//     icon: '💧',
//     color: '#3A9FE4',
//     amount: 5.1,
//     percent: 25.1,
//     timeRange: 'Jan to Apr 2025',
//     subCategoryItem: [
//       {
//         _id: '3',
//         subCategory: 'Electricity',
//         amount: 2.5,
//         color: '#3A9FE4',
//         percent: 12.5,
//       },
//       {
//         _id: '4',
//         subCategory: 'Water',
//         amount: 2.6,
//         color: '#3A9FE4',
//         percent: 13.0,
//       },
//     ],
//   },
//   {
//     category: 'Mobility',
//     icon: '🚗',
//     color: '#FF9800',
//     amount: 4.3,
//     percent: 21.8,
//     timeRange: 'Jan to Apr 2025',
//     subCategoryItem: [
//       {
//         _id: '5',
//         subCategory: 'Fruits',
//         amount: 3.6,
//         color: '#FF9800',
//         percent: 17.7,
//       },
//       {
//         _id: '6',
//         subCategory: 'Vegetables',
//         amount: 3.6,
//         color: '#FF9800',
//         percent: 17.7,
//       },
//     ],
//   },
//   {
//     category: 'Goods',
//     icon: '🚗',
//     color: '#FF9800',
//     amount: 4.3,
//     percent: 21.8,
//     timeRange: 'Jan to Apr 2025',
//     subCategoryItem: [
//       {
//         _id: '7',
//         subCategory: 'Fruits',
//         amount: 3.6,
//         color: '#FF9800',
//         percent: 17.7,
//       },
//       {
//         _id: '8',
//         subCategory: 'Vegetables',
//         amount: 3.6,
//         color: '#FF9800',
//         percent: 17.7,
//       },
//     ],
//   },
// ];

type TabType = 'All' | 'Nutrition' | 'Housing' | 'Mobility';

interface EmissionBreakdownCardProps {
  dataLoading: boolean;
  setDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmissionBreakdownCard = ({
  dataLoading,
  setDataLoading,
}: EmissionBreakdownCardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const dispatch = useAppDispatch();
  const anaylticsData = useAppSelector(state => state.analytics.analytics);

  console.log('anaylticsData', anaylticsData);

  // Filter data based on active tab
  const filteredData =
    activeTab === 'All'
      ? anaylticsData?.category
      : anaylticsData?.category?.filter(item => item.category === activeTab);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      await dispatch(getAnalyticsCategoryWiseData(2025)).unwrap();
    } catch (error) {
      console.error('Error fetching food items:', error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetchData = !anaylticsData;
    if (shouldFetchData) {
      fetchData();
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      {dataLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScroll}
            contentContainerStyle={styles.tabsContainer}>
            {(
              [
                'All',
                'Nutrition',
                'Housing',
                'Mobility',
                'Goods',
                'Leisure',
              ] as TabType[]
            ).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab ? styles.activeTabButton : null,
                ]}
                onPress={() => setActiveTab(tab)}>
                {tab === 'Nutrition' && activeTab !== 'Nutrition' && (
                  <Text style={styles.tabIcon}></Text>
                )}
                {tab === 'Housing' && activeTab !== 'Housing' && (
                  <Text style={styles.tabIcon}></Text>
                )}
                {tab === 'Mobility' && activeTab !== 'Mobility' && (
                  <Text style={styles.tabIcon}></Text>
                )}
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab
                      ? styles.activeTabText
                      : styles.inactiveTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Cards list */}
          <FlatList
            data={filteredData}
            keyExtractor={item => item.category}
            renderItem={({item}) => {
              return activeTab === 'All' ? (
                <AllCategory item={item} />
              ) : (
                <CategoryWise item={item} />
              );
            }}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

const AllCategory = ({item}: {item: AnalyticsCategory}) => {
  // SVG measurements for the circular progress
  const radius = 18;
  const strokeWidth = 4;
  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - item.percent / 100);

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View
          style={[styles.iconContainer, {backgroundColor: `${item.color}15`}]}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.bold}>{item.totalEmission.toFixed(2)}</Text>
            <Text style={styles.unit}> kg CO₂e</Text>
          </View>
          <Text style={styles.date}>{item.timeRange}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <Circle
            stroke="#EAEAEA"
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <Circle
            stroke={item.color}
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
          />

          {/* Percentage text */}
          <SvgText
            x={radius + strokeWidth}
            y={radius + strokeWidth + 4}
            fontSize="10"
            fontWeight="bold"
            fill="#333"
            textAnchor="middle">
            {item.percent}
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

const CategoryWise = ({item}: {item: AnalyticsCategory}) => {
  // SVG measurements for the circular progress
  const radius = 25;
  const strokeWidth = 5;
  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - item.percent / 100);

  return (
    <View>
      <View style={[styles.categoryCard, {backgroundColor: `${item.color}15`}]}>
        <View style={{flex: 1}}>
          <View style={styles.categoryIconContainer}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryAmountContainer}>
              <Text style={[styles.categoryAmount, {color: item.color}]}>
                {item.totalEmission.toFixed(2)}
              </Text>
              <Text> kg CO₂e</Text>
            </View>
            <View>
              <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background circle */}
                <Circle
                  stroke="#EAEAEA"
                  fill="none"
                  cx={radius + strokeWidth}
                  cy={radius + strokeWidth}
                  r={radius}
                  strokeWidth={strokeWidth}
                />

                {/* Progress circle */}
                <Circle
                  stroke={item.color}
                  fill="none"
                  cx={radius + strokeWidth}
                  cy={radius + strokeWidth}
                  r={radius}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
                />

                {/* Percentage text */}
                <SvgText
                  x={radius + strokeWidth}
                  y={radius + strokeWidth + 4}
                  fontSize="10"
                  fontWeight="bold"
                  fill="#333"
                  textAnchor="middle">
                  {item.percent}
                </SvgText>
              </Svg>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={item.subCategoryItem}
        keyExtractor={item => item._id}
        renderItem={({item}) => <SubItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const SubItem = ({item}: {item: SubCategoryItem}) => {
  return (
    <View style={styles.subItemCard}>
      <View style={styles.cardContent}>
        <Text style={styles.subCategory}>{item.dataId}</Text>
        <Text style={styles.amount}>
          {item.yearlyEmission.toFixed(2)} kg CO2e
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Progress.Bar
          progress={item.yearlyEmission / 100}
          // style={[styles.progressBar, {backgroundColor: `${item.color}15`}]}
          // color={item.color}
          unfilledColor="#E8F5E8"
          borderWidth={0}
          width={null}
        />
        <Text>{item.yearlyEmission.toFixed(2)} %</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
    // backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsScroll: {
    // maxHeight: 120,
    flexGrow: 0,
  },
  tabsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  activeTabButton: {
    backgroundColor: '#0D9F6A12', // Light green with opacity
  },
  tabIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0D9F6A', // Green
  },
  inactiveTabText: {
    color: '#666666',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    // marginRight: 10,
    fontSize: 20,
  },
  textContainer: {
    justifyContent: 'center',
  },
  category: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333333',
    marginBottom: 2,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  bold: {
    fontWeight: '700',
    fontSize: 18,
    color: '#222222',
  },
  unit: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  date: {
    fontSize: 12,
    color: '#888888',
  },
  chartContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryCard: {
    // backgroundColor: '#0D9F6A12',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoryIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
    height: 40,
  },

  categoryIcon: {
    marginRight: 10,
    fontSize: 20,
  },

  categoryText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333333',
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryAmountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  categoryAmount: {
    fontWeight: 'bold',
    fontSize: 40,
    // color: '#0D9F6A',
  },

  subItemCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subCategory: {
    fontSize: 14,
    fontWeight: '500',
  },

  amount: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  progressBar: {
    width: '90%',
  },
});

export default EmissionBreakdownCard;
