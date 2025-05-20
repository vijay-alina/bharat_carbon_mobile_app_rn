import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface EmissionItem {
  category: string;
  icon: string; // Emoji or image placeholder
  color: string;
  amount: number;
  percent: number;
  timeRange: string;
}

const data: EmissionItem[] = [
  {
    category: 'Nutrition',
    icon: '🍏',
    color: '#4CAF50',
    amount: 7.2,
    percent: 35.5,
    timeRange: 'Jan to Apr 2025',
  },
  {
    category: 'Housing',
    icon: '💧',
    color: '#3A9FE4',
    amount: 5.1,
    percent: 25.1,
    timeRange: 'Jan to Apr 2025',
  },
  {
    category: 'Mobility',
    icon: '🚗',
    color: '#FF9800',
    amount: 4.3,
    percent: 21.8,
    timeRange: 'Jan to Apr 2025',
  },
];

type TabType = 'All' | 'Nutrition' | 'Housing' | 'Mobility';

const EmissionBreakdownCard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('All');

  // Filter data based on active tab
  const filteredData = activeTab === 'All' 
    ? data 
    : data.filter(item => item.category === activeTab);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabsContainer}
      >
        {(['All', 'Nutrition', 'Housing', 'Mobility'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab ? styles.activeTabButton : null
            ]}
            onPress={() => setActiveTab(tab)}
          >
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
                activeTab === tab ? styles.activeTabText : styles.inactiveTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cards list */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const Card = ({ item }: { item: EmissionItem }) => {
  // SVG measurements for the circular progress
  const radius = 18;
  const strokeWidth = 4;
  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - item.percent / 100);
  
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
          <Text style={styles.icon}>{item.icon}</Text>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.bold}>{item.amount}</Text>
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
            textAnchor="middle"
          >
            {item.percent}%
          </SvgText>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  tabsScroll: {
    maxHeight: 50,
    flexGrow: 0,
  },
  tabsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
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
    shadowOffset: { width: 0, height: 2 },
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
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
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
});



export default EmissionBreakdownCard;