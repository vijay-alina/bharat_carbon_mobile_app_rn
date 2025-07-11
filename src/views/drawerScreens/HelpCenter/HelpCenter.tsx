import React from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {Header} from '../../../common/header';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';

const HelpCenterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Help Center"
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {/* Welcome Section */}
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to Help Center</Text>
            <Text style={styles.welcomeSubtitle}>We're here to assist you with any questions or concerns</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.contactCard}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            
            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => Linking.openURL('tel:+02066869999')}
            >
              <View style={styles.contactIcon}>
                <Text style={styles.iconText}>📞</Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Phone Support</Text>
                <Text style={styles.contactValue}>+020 6686 9999</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.contactItem}
              onPress={() => Linking.openURL('https://www.bharatcarbon.earth')}
            >
              <View style={styles.contactIcon}>
                <Text style={styles.iconText}>🌐</Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactLabel}>Visit Our Website</Text>
                <Text style={styles.contactValue}>www.bharatcarbon.earth</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqCard}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.faqText}>Find answers to common questions about carbon tracking, sustainability, and our platform.</Text>
          </View>

          {/* Support Hours */}
          <View style={styles.hoursCard}>
            <Text style={styles.sectionTitle}>Support Hours</Text>
            <Text style={styles.hoursText}>Monday - Friday: 9:00 AM - 6:00 PM</Text>
            <Text style={styles.hoursText}>Saturday: 10:00 AM - 4:00 PM</Text>
            <Text style={styles.hoursSubtext}>We typically respond within 24 hours</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 20,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '500',
  },
  faqCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  hoursCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hoursText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 4,
    fontWeight: '500',
  },
  hoursSubtext: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default HelpCenterScreen;
