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

const foodItems = [
  {name: 'Tofu Stir Fry', points: 15},
  {name: 'Quinoa Salad', points: 12},
  {name: 'Mixed Veg Curry', points: 10},
  {name: 'Oats & Almond Milk', points: 14},
  {name: 'Boiled Eggs', points: 10},
  {name: 'Paneer Wrap', points: 12},
  {name: 'Coconut Milk Smoothie', points: 13},
  {name: 'Hummus & Pita', points: 11},
  {name: 'Dal Khichdi', points: 15},
  {name: 'Fresh Fruit Bowl', points: 10},
  {name: 'Chia Pudding', points: 13},
  {name: 'Avocado Toast', points: 14},
  {name: 'Other', points: 0},
];

const ConsumItemList = () => {
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customItem, setCustomItem] = useState('');
  const foodItem = useAppSelector(state => state.dropdown.foodItem);

  console.log('foodItem', foodItem);

  const handleSelect = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
    if (item === 'Other') setCustomItem('');
  };

  const renderItem = ({item}: {item: {name: string; points: number}}) => (
    <View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => handleSelect(item.name)}>
        <View style={styles.checkbox}>
          {selectedItems.includes(item.name) ? (
            <CheckBoxIcon width={20} height={20} />
          ) : (
            <UnCheckBoxIcon width={20} height={20} />
          )}
        </View>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.pointsBadge}>
          <BedgeIcon width={20} height={20} />
          <Text style={styles.pointsText}>{item.points} pts</Text>
        </View>
      </TouchableOpacity>

      {item.name === 'Other' && selectedItems.includes('Other') && (
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
          <View style={styles.selectedItem} key={item}>
            <Text style={styles.selectedText}>{item}</Text>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <CrossIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Food List */}
      <FlatList
        data={foodItems.filter(i =>
          i.name.toLowerCase().includes(search.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={item => item.name}
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
});
