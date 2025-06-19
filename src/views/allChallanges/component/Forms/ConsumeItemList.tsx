import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBoxIcon from '../../../../images/icons/checkbox.svg';
import UnCheckBoxIcon from '../../../../images/icons/checkbox_uncheck.svg';
import SearchIcon from '../../../../images/icons/SearchIcon.svg';
import CrossIcon from '../../../../images/icons/crossIcon.svg';
import BedgeIcon from '../../../../images/icons/greenBedgeIcon.svg';
import {useAppSelector} from '../../../../hooks/hooks';
import CustomButton from '../../../../common/button';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {FoodItem} from '../../../../features/dropdown/dropdownType';
import {RootStackParamList} from '../../../../navigations/rootStackNavigator';

type ConsumItemListRouteProp = RouteProp<RootStackParamList, 'ConsumItemList'>;

const ConsumItemList = () => {
  const navigation = useNavigation();
  const route = useRoute<ConsumItemListRouteProp>();
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>(
    route.params?.selectedItems || [],
  );
  const [customItem, setCustomItem] = useState('');
  const foodItem = useAppSelector(state => state.dropdown.foodItem);

  console.log('foodItem', foodItem);

  const handleSelect = (item: FoodItem) => {
    setSelectedItems(prev =>
      prev.some(i => i.value === item.value)
        ? prev.filter(i => i.value !== item.value)
        : [...prev, item],
    );
    if (item.label === 'Other') setCustomItem('');
  };
  console.log('selectedItems', selectedItems);

  const handleDone = () => {
    if (route.params?.onSelect) {
      route.params.onSelect(selectedItems);
    }
    navigation.goBack();
  };

  const renderItem = ({item}: {item: any}) => (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => handleSelect(item)}>
        <View style={styles.checkbox}>
          {selectedItems.find(i => i.value === item.value) ? (
            <CheckBoxIcon width={20} height={20} />
          ) : (
            <UnCheckBoxIcon width={20} height={20} />
          )}
        </View>
        <Text style={styles.itemText}>{item.label}</Text>
        <View style={styles.pointsBadge}>
          <BedgeIcon width={20} height={20} />
          <Text style={styles.pointsText}>{item?.Points} pts</Text>
        </View>
      </TouchableOpacity>

      {item.label === 'Other' &&
        selectedItems.find(item => item.label === 'Other') && (
          <TextInput
            style={styles.otherInput}
            placeholder="Enter item name"
            placeholderTextColor="#999"
            value={customItem}
            onChangeText={setCustomItem}
          />
        )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search items..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <SearchIcon width={18} height={18} />
      </View>

      {/* Selected Items */}
      <View style={styles.selectedContainer}>
        {selectedItems.map(item => (
          <View style={styles.selectedItem} key={item.value}>
            <Text style={styles.selectedText}>{item.label}</Text>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <CrossIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Food List */}
      <FlatList
        data={foodItem.filter(i =>
          i.label.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={item => item.label}
      />

      <CustomButton
        text={'Done'}
        onPress={handleDone}
        backgroundColor="#17a086"
        style={styles.submitButton}
      />
    </View>
  );
};

export default ConsumItemList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F8FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1F0E3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  selectedText: {
    marginRight: 6,
    color: '#1A524C',
    fontFamily: 'Montserrat-Medium',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#0A524C',
    fontFamily: 'Montserrat-Medium',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E1F6F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: '#0A524C',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  otherInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
});
