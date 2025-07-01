import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import AvtarImage from '../../../images/icons/avatar_placeholder.png';
import {Colors} from '../../../constants/colors';
import PointsComponent from '../../addMember/components/PointsComponent';

const ItemCard = ({
  student,
  index,
  rank,
}: {
  student: any;
  index: number;
  rank: number;
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: index !== 0 ? Colors.CardGray : Colors.DarkGreen},
      ]}>
      <View style={styles.row}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image source={AvtarImage} style={styles.avtarImg} />
            <View
              style={{
                backgroundColor:
                  index === 0 ? Colors.CardGray : Colors.DarkGreen,
                borderRadius: 10,
                paddingHorizontal: 10,
                top: -5,
                // paddingVertical: 2,
              }}>
              <Text
                style={{
                  fontSize: 10,
                  color: index === 0 ? Colors.Black : Colors.White,
                }}>
                # {rank}
              </Text>
            </View>
          </View>

          <View style={{marginLeft: 10}}>
            <Text
              style={[
                styles.title,
                {color: index !== 0 ? Colors.Black : Colors.White},
              ]}>
              {student.name} {index === 0 && '(Me)'}
            </Text>

            <Text style={{color: index !== 0 ? Colors.Black : Colors.White}}>
              {student.class}
            </Text>
          </View>
        </View>
        <PointsComponent points={student.points} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 15,
    marginTop: 8,
  },
  title: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avtarImg: {
    height: 60,
    width: 60,
  },
});

export default ItemCard;
