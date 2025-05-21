import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AnalyticsCard from './components/analyticsCard';
import EmissionBreakdownCard from './components/emissionBreakdownCard';
import {Header} from '../../common/header';

const screenWidth = Dimensions.get('window').width;

export const StatsScreen = () => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Header title="Analytics" isHomeScreen={true} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Slider Area */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}>
          <View style={{width: screenWidth}}>
            <AnalyticsCard />
          </View>
          {/* You can add more slides here if needed */}
        </ScrollView>

        {/* Below Slider Content */}
        <View style={styles.content}>
          <EmissionBreakdownCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F7FB'},
  slider: {
    height: 260, // Adjust height to fit your chart
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 10,
  },
});
