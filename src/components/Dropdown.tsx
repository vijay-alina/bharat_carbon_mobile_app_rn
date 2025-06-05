import React, {useState, useRef, JSX} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

// Type definitions
interface DropdownItem {
  label: string;
  value: string | number;
}

interface DropdownProps {
  data?: (DropdownItem | string)[];
  placeholder?: string;
  onSelect?: (item: DropdownItem | string) => void;
  selectedValue?: string | number | null;
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  maxHeight?: number;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  data = [],
  placeholder = 'Select an option',
  onSelect,
  selectedValue,
  style,
  dropdownStyle,
  textStyle,
  placeholderStyle,
  itemStyle,
  itemTextStyle,
  maxHeight = 200,
  disabled = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dropdownTop, setDropdownTop] = useState<number>(0);
  const [dropdownLeft, setDropdownLeft] = useState<number>(0);
  const [dropdownWidth, setDropdownWidth] = useState<number>(0);
  //@ts-ignore
  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleDropdown = (): void => {
    if (disabled) {return;}

    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    buttonRef.current?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        setDropdownTop(py + height);
        setDropdownLeft(px);
        setDropdownWidth(width);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: DropdownItem | string): void => {
    setVisible(false);
    onSelect && onSelect(item);
  };

  const renderItem = ({item}: {item: DropdownItem | string}) => (
    <TouchableOpacity
      style={[styles.item, itemStyle]}
      onPress={() => onItemPress(item)}>
      <Text style={[styles.itemText, itemTextStyle]}>
        {typeof item === 'string' ? item : item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): JSX.Element => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View
            style={[
              styles.dropdown,
              dropdownStyle,
              {
                top: dropdownTop,
                left: dropdownLeft,
                width: dropdownWidth,
                maxHeight: maxHeight,
              },
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item: DropdownItem | string, index: number) =>
                index.toString()
              }
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const getDisplayText = (): string => {
    if (selectedValue !== null && selectedValue !== undefined) {
      const selected = data.find(item => {
        if (typeof item === 'string') {
          return item === selectedValue;
        }
        return item.value === selectedValue;
      });

      if (selected) {
        return typeof selected === 'string' ? selected : selected.label;
      }
      return selectedValue.toString();
    }
    return placeholder;
  };

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.button, style, disabled && styles.disabled]}
        onPress={toggleDropdown}
        disabled={disabled}>
        <Text
          style={[
            styles.buttonText,
            textStyle,
            (selectedValue === null || selectedValue === undefined) && [
              styles.placeholder,
              placeholderStyle,
            ],
          ]}>
          {getDisplayText()}
        </Text>
        <Text
          style={[
            styles.arrow,
            {transform: [{rotate: visible ? '180deg' : '0deg'}]},
          ]}>
          ▼
        </Text>
      </TouchableOpacity>
      {renderDropdown()}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff',
    height: 50,
    zIndex: 1,
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // borderRadius: 8,
    width: 150,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
