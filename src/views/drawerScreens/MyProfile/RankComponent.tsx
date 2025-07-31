import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants/colors';
import {DEVICE_WIDTH, getLetterSpacing} from '../../../utils/utils';
import {Text} from 'react-native';
import VerticalDivider from '../../../images/icons/vertical_divider.png';
import {
  ClassRankGreenIcon,
  EarnedPointsGreenIcon,
  SchoolRankGreenIcon,
} from '../../../images/icons';
import {useAppContext} from '../../../context/AppContext';

type RankCompProps = {
  earnedPoints: number;
  schoolRank?: number;
  classRank?: number;
  familyRank?: number;
};

const RankComponent = (props: RankCompProps) => {
  const {user} = useAppContext();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.content}>
          <EarnedPointsGreenIcon />
          <Text style={styles.labelText}>EARNED POINTS</Text>
          <Text style={styles.valueText}>{props.earnedPoints}</Text>
        </View>
        <Image source={VerticalDivider} style={styles.divider} />
        {user.type === 'student' ? (
          <>
            <View style={styles.content}>
              <SchoolRankGreenIcon />
              <Text style={styles.labelText}>SCHOOL RANK</Text>
              <Text style={styles.valueText}>{`#${props.schoolRank}`}</Text>
            </View>
            <Image source={VerticalDivider} style={styles.divider} />
            <View style={styles.content}>
              <ClassRankGreenIcon />
              <Text style={styles.labelText}>CLASS RANK</Text>
              <Text style={styles.valueText}>{`#${props.classRank}`}</Text>
            </View>
          </>
        ) : (
          <View style={styles.content}>
            <SchoolRankGreenIcon />
            <Text style={styles.labelText}>Family RANK</Text>
            <Text style={styles.valueText}>{`#${props.familyRank}`}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RankComponent;

const styles = StyleSheet.create({
  wrapper: {
    width: DEVICE_WIDTH * 0.96,
    height: 110,
    backgroundColor: Colors.Neutral200,
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    width: DEVICE_WIDTH * 0.95,
    height: 108,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    borderRadius: 16,
  },
  divider: {
    width: 3,
    height: 100,
  },
  content: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    letterSpacing: getLetterSpacing(12, 4),
    color: Colors.PrimaryBlue,
    marginTop: 6,
  },
  valueText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: Colors.PrimaryBlue,
    marginTop: 6,
  },
});
