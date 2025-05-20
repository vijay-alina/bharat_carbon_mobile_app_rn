import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Colors } from '../../../constants/colors';
import { getLineHeight } from '../../../utils/utils';

const HomeHorizontalCard = () => (
  <View style={styles.card}>
    {/* Left side: title and subtitle */}
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{`Welcome to \nBharat carbon!`}</Text>
      <Text style={styles.cardSubtitle}>
        Take small steps every day to lower your carbon effect and earn rewards!{' '}
      </Text>
    </View>

    {/* Right side: image */}
    <Image
      source={{uri: 'https://placehold.co/75x75'}}
      style={styles.cardImage}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    // height: 107,
    width: '100%',
    backgroundColor: '#1FE1BC',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.NeutralsDark,
    marginBottom: 4,
    lineHeight: getLineHeight(16, 120),
  },
  cardSubtitle: {
    fontFamily: 'Montserrat-Medium',
    fontWeight: 400,
    fontSize: 12,
    color: Colors.NeutralsDark,
    lineHeight: getLineHeight(12, 120),
    marginTop: 10,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
});

export default HomeHorizontalCard;
