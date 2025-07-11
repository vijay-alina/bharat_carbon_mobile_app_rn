import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import {Header} from '../../common/header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/colors';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const tabs = [
  'General',
  'Points & Rewards',
  'Activities & Logs',
  'Challenges',
  'Family & Sharing',
  'Privacy & Data',
] as const;

type TabKey = (typeof tabs)[number];

const faqData: Record<TabKey, FAQItem[]> = {
  General: [
    {
      question: 'What is this app about?',
      answer:
        'This app helps you track your daily lifestyle choices and understand their environmental impact in terms of CO₂ emissions.',
    },
    {
      question: 'How do I get started?',
      answer: 'You can start by signing up and entering your daily habits.',
    },
    {
      question: 'Can I use the app offline?',
      answer: 'Yes, but some features may require internet connectivity.',
    },
  ],
  'Points & Rewards': [
    {
      question: 'How do I earn points?',
      answer: 'Points are earned by completing eco-friendly activities.',
    },
    {
      question: 'How to redeem points?',
      answer: 'Go to the Rewards tab and select redeemable items.',
    },
  ],
  'Activities & Logs': [
    {
      question: 'Can I log past activities?',
      answer: 'Yes, you can add past logs from the calendar view.',
    },
    {
      question: 'How do I delete an activity?',
      answer: 'Swipe left on the activity to delete it.',
    },
  ],
  Challenges: [
    {
      question: 'Can I log past activities?',
      answer: 'Yes, you can add past logs from the calendar view.',
    },
    {
      question: 'How do I delete an activity?',
      answer: 'Swipe left on the activity to delete it.',
    },
  ],
  'Family & Sharing': [
    {
      question: 'Can I log past activities?',
      answer: 'Yes, you can add past logs from the calendar view.',
    },
    {
      question: 'How do I delete an activity?',
      answer: 'Swipe left on the activity to delete it.',
    },
  ],
  'Privacy & Data': [
    {
      question: 'Can I log past activities?',
      answer: 'Yes, you can add past logs from the calendar view.',
    },
    {
      question: 'How do I delete an activity?',
      answer: 'Swipe left on the activity to delete it.',
    },
  ],
};

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<TabKey>('General');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<FAQItem[]>([]);

  useEffect(() => {
    const data = faqData[selectedTab].filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(data);
  }, [searchQuery, selectedTab]);

  interface ToggleExpand {
    (index: number): void;
  }

  const toggleExpand: ToggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex((prev: number | null) => (prev === index ? null : index));
  };

  return (
    <View style={styles.container}>
      <Header
        title="FAQs"
        onBackClick={() => {
          navigation.goBack();
        }}
        isHomeScreen={true}
      />
      <Text style={styles.heading}>Frequently Asked Questions</Text>
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => {
                setSelectedTab(tab);
                setExpandedIndex(null);
                setSearchQuery('');
              }}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}: {item: FAQItem; index: number}) => (
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.accordionItem}
            activeOpacity={0.9}>
            <View style={styles.accordionHeader}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={{fontSize: 16}}>
                {expandedIndex === index ? '▲' : '▼'}
              </Text>
            </View>
            {expandedIndex === index && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1e293b',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  searchInputContainer: {
    marginHorizontal: 16,
  },
  searchInput: {
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 16,
  },
  tabButton: {
    backgroundColor: Colors.White,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: Colors.ThickGreenShades700,
  },
  tabText: {
    color: '#111827',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  accordionItem: {
    // backgroundColor: '#fff',
    padding: 14,
    // borderRadius: 10,
    marginBottom: 8,
    // borderColor: '#e5e7eb',
    // borderWidth: 1,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  answerText: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 14,
    lineHeight: 20,
  },
});
