import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native';
import {ChevronRightIcon} from '../images/icons';
import {Colors} from '../constants/colors';

type DrawerItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

const CustomDrawerItem: React.FC<DrawerItemProps> = ({
  icon,
  label,
  onPress,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <View style={styles.constentLeftContainer}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.constentRightContainer}>
        {label === 'Notification' ? (
          <Switch
            trackColor={{false: '#767577', true: '#3D9D91'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        ) : (
          label !== 'Logout' && <ChevronRightIcon style={{marginRight: 10}} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    minHeight: 56,
  },
  constentLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  constentRightContainer: {
    justifyContent: 'flex-end',
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 12,
  },
});

export default CustomDrawerItem;
