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
  Modal,
  Alert,
  TouchableOpacity,
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
import {useAppDispatch} from '../../hooks/hooks';
import {challengeAccept} from '../../features/manageChallege/manageChallengeThunks';

const VegetarianChallengeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {challengeType, challengeData} = route.params as {
    challengeType: string;
    challengeData: any;
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [challangeAcceptPayload, setChallangeAcceptPayload] = useState<any>();

  const dispatch = useAppDispatch();

  const openModal = (payload: any) => {
    setIsModalVisible(true);
    setChallangeAcceptPayload(payload);
  };

  const handleAccept = async () => {
    setButtonDisabled(true);
    setIsSubmitting(true);

    try {
      await dispatch(challengeAccept(challangeAcceptPayload)).unwrap();

      navigation.navigate('OngoingChallengeScreen', {
        challengeType,
        challengeData: challengeData,
        days: challangeAcceptPayload.days,
      });

      // Alert.alert('Success', 'Challenge Accept Successfully!', [
      //   {
      //     text: 'OK',
      //     onPress: () => {
      //       setTimeout(() => {
      //         setButtonDisabled(false);
      //         setIsSubmitting(false);
      //       }, 400);
      //     },
      //   },
      // ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to accept challenge');
      setButtonDisabled(false);
      setIsSubmitting(false);
      setIsModalVisible(false);
    }
  };

  console.log('challengeData ##################', challengeData);

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
                challengeData={challengeData}
                openModal={openModal}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          // onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Save Water Challenge is On!</Text>

              <Text style={styles.modalText}>
                Track your water-saving actions daily for 7 days. Earn 100
                points!
              </Text>

              {/* <View style={styles.iconWrapper}> */}
              <Image
                source={challengeData.image}
                style={styles.illustrationModal}
                resizeMode="contain"
              />
              {/* </View> */}

              <Text style={styles.modalText1}>
                Save water every day for 7 days.
              </Text>

              <TouchableOpacity onPress={handleAccept}>
                {isSubmitting ? (
                  <ActivityIndicator color="green" />
                ) : (
                  <Text style={styles.modalTitle}>All The Best!</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

  //modal

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  illustrationModal: {
    width: '100%',
    height: 150,
    marginBottom: 24,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D5F4F',
    textAlign: 'center',
    marginBottom: 10,
  },

  modalText: {
    fontSize: 14,
    color: '#0D5F4F',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  modalText1: {
    fontSize: 14,
    color: '#127C68',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 8,
  },

  iconWrapper: {
    backgroundColor: '#17A086',
    borderRadius: 100,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VegetarianChallengeScreen;
