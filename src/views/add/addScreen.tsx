import { Text, TouchableOpacity, View } from 'react-native';
import { BackIcon } from '../../images/icons';

export const AddScreen = () => {

  const toggleDrawer = () => {
    //   navigation.toggleDrawer();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <BackIcon />
      </TouchableOpacity>
      <Text>Add Screen</Text>
    </View>
  );
};
