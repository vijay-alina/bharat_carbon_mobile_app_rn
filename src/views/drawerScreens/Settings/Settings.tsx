import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Header} from '../../../common/header';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants/colors';
import {termsCondition} from '../../../constants/constants';

const tabs = ['Privacy & Policy', 'Terms & Conditions'] as const;

type TabKey = (typeof tabs)[number];

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<TabKey>('Privacy & Policy');

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Settings"
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
      {selectedTab === 'Privacy & Policy' ? (
        <View style={styles.contentWrapper}>
          <ScrollView style={styles.textContainer}>
            <Text style={styles.textHeader}>Privacy policy</Text>
            <Text style={styles.desc}>
              Read about how your data is collected and used
            </Text>
          </ScrollView>

          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.deleteText}>Delete Account</Text>
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.textContainer}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.textHeader}>Terms And Conditions</Text>
            <Text style={styles.desc}>{termsCondition}</Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  tabsContainer: {
    marginTop: 30,
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
    marginEnd: 10,
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
  contentWrapper: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 9,
  },
  textHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black,
  },
  desc: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.Black3,
    textAlign: 'justify',
  },
  btnContainer: {
    backgroundColor: Colors.RedNormal,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  deleteIcon: {
    fontSize: 16,
  },
});

export default SettingsScreen;
