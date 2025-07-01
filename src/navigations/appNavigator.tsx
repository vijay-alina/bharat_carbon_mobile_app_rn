import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IntroStackNavigator} from './introStackNavigator';
import {OnboardingStackNavigator} from './onboardingStackNavigator';
import {SubscriptionStackNavigator} from './subscriptionStackNavigator';
import {ProfileStackNavigator} from './profileStackNavigator';

import {useAppContext} from '../context/AppContext';
import {RootStackNavigator} from './rootStackNavigator';

export const AppNavigator = () => {
  const {
    hasCompletedIntro,
    hasCompletedOnboarding,
    hasCompletedProfile,
    hasCompletedSubscription,
    isLoading,
  } = useAppContext();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#23B397" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!hasCompletedIntro) {
    return <IntroStackNavigator />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingStackNavigator />;
  }

  if (!hasCompletedProfile) {
    return <ProfileStackNavigator />;
  }

  if (!hasCompletedSubscription) {
    return <SubscriptionStackNavigator />;
  }

  return <RootStackNavigator />;
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
