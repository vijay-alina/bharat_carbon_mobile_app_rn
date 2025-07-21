import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Header} from '../common/header';

export type ProfileProps = {
  onBackPress: () => void;
};

export const ProfileHeader: FC<ProfileProps> = ({
  onBackPress,
}) => (
  <View style={styles.profileContainer}>
    <View style={styles.profileHeader}>
      <Header title="My Profile" onBackClick={onBackPress} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    // backgroundColor: 'orange',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
