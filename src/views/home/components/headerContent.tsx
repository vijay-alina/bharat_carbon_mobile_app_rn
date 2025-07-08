import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  HeaderContentBackgroundImage,
  MenuIcon,
  PointsStarIcon,
} from '../../../images/icons';
import HomeHorizontalCard from './home-horizontal-card';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const ListHeaderContent = (props: Props) => {
  const [student, setStudent] = useState<any>({});
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    const getUser = async () => {
      const userData: any = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setStudent(user);
    };
    getUser();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={HeaderContentBackgroundImage}
      width={width}
      height={273}>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={openDrawer}>
          <MenuIcon />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <View style={styles.pointsContainer}>
            <PointsStarIcon />
            <Text style={styles.pointsText}>590</Text>
          </View>
          <Image
            source={{uri: 'https://i.pravatar.cc/100'}}
            style={styles.avatar}
          />
        </View>
      </View>
      <Text style={styles.greetingText}>Good Morning, {student.firstName}</Text>
      <HomeHorizontalCard />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  greetingText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginVertical: 24,
    color: Colors.PrimaryBlue,
  },
  menuContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsContainer: {
    backgroundColor: '#95f0df',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#000',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
});
export default ListHeaderContent; // Export the component
