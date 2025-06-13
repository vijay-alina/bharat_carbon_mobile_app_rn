import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IntroStackNavigator} from './introStackNavigator';
import {OnboardingStackNavigator} from './onboardingStackNavigator';
import {useAppContext} from '../context/AppContext';
import { RootStackNavigator } from './rootStackNavigator';

export const AppNavigator = () => {
  const {hasCompletedIntro, hasCompletedOnboarding, isLoading} =
    useAppContext();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
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