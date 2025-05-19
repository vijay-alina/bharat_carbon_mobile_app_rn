import React, {FC} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { MenuIcon, PointsStarIcon } from '../images/icons';

export type HomeHeaderProps = {
    onMenuPress: () => void;
}

const HomeHeader:FC<HomeHeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <MenuIcon />
      </TouchableOpacity>
      <View style={styles.rightContainer}>
        <View style={styles.pointsContainer}>
          <PointsStarIcon />
          <Text style={styles.pointsText}>590</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3f5f1', // light mint/teal
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default HomeHeader;
