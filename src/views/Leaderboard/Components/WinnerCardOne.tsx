import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import AvtarImage from '../../../images/icons/avatar_placeholder.png';
import {Colors} from '../../../constants/colors';
import BedgeImage from '../../../images/icons/Top_1.png';
import CrownImage from '../../../images/icons/crown_icon.png';

const WinnersCardOne = ({student}: {student: any}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avtarSection}>
        <Image
          source={CrownImage}
          style={{height: 40, width: 50, position: 'absolute', top: -25}}
        />
        <View style={styles.avatarWrapper}>
          <Image source={AvtarImage} style={styles.avatarImage} />
        </View>
        <View style={styles.label}>
          <Image source={BedgeImage} style={styles.bdgImage} />
        </View>
      </View>
      <Text style={styles.name}>{student.name}</Text>
      <Text style={styles.grade}>{student.class}</Text>
      <View style={styles.bedge}>
        <Text style={styles.bedgeText}>{student.points} pts</Text>
      </View>
    </View>
  );
};
const AVATAR_SIZE = 70;
const BORDER_WIDTH = 11;
const Bedge_IMAGE_SIZE = 90;
const styles = StyleSheet.create({
  container: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  avtarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarWrapper: {
    width: AVATAR_SIZE + BORDER_WIDTH * 2,
    height: AVATAR_SIZE + BORDER_WIDTH * 2,
    borderRadius: (AVATAR_SIZE + BORDER_WIDTH * 2) / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: '#F4BF16', // Purple border
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  label: {
    position: 'absolute',
    bottom: -Bedge_IMAGE_SIZE / 2 + 4, // adjust to overlap the bottom of avatar
    width: Bedge_IMAGE_SIZE,
    height: Bedge_IMAGE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bdgImage: {
    width: Bedge_IMAGE_SIZE,
    height: Bedge_IMAGE_SIZE,
    resizeMode: 'contain',
  },
  labelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  name: {
    marginTop: 1,
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: Colors.White,
  },
  grade: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.White,
    fontSize: 12,
  },
  bedge: {
    paddingVertical: 4,
    paddingHorizontal: 20,
    backgroundColor: Colors.LightGreenBtn,
    borderRadius: 20,
  },
  bedgeText: {
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.White,
    fontSize: 10,
  },
});
export default WinnersCardOne;
