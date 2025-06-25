import React, {use, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Platform,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import DayChallengeCard from './component/DayChallengeCard';
import {Colors} from '../../constants/colors';
import {chooseChallengePeriod} from '../../constants/constants';
import {Header} from '../../common/header';
import LinearGradient from 'react-native-linear-gradient';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const VegetarianChallengeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const {challengeType, challengeData} = route.params as {
    challengeType: string;
    challengeData: any;
  };

  return (
    <LinearGradient
      colors={['#17A086', '#0A2210']}
      start={{x: 0.5, y: 0}}
      end={{x: 0.5, y: 1}}
      style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Header
            title="Set your Goal"
            onBackClick={() => {
              navigation.goBack();
            }}
            isHomeScreen={true}
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingBottom: tabBarHeight - 40}}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <Text style={styles.title}>{challengeData?.title}</Text>
          <Text style={styles.subtitle}>{challengeData.subtitle}</Text>

          <Image
            source={challengeData.image}
            style={styles.illustration}
            resizeMode="contain"
          />

          <FlatList
            data={chooseChallengePeriod}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            scrollEnabled={false}
            renderItem={({item}) => (
              <DayChallengeCard
                title={item.title}
                description={item.description}
                reward={item.reward}
                days={item.day}
                point={item.point}
                challengeType={challengeType}
                challengeData={challengeData}
                buttonDisabled={buttonDisabled}
                setButtonDisabled={setButtonDisabled}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
  },
  headerWrapper: {
    zIndex: 10,
    elevation: 5,
    ...Platform.select({
      android: {backgroundColor: 'transparent'},
      ios: {},
    }),
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.White,
    textAlign: 'center',
    marginBottom: 20,
  },
  illustration: {
    width: '100%',
    height: 250,
    marginBottom: 24,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default VegetarianChallengeScreen;
