import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import AddIcon from '../../../../images/icons/add_plus.svg';
import ConsumItemList from './ConsumeItemList';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg';
import {Colors} from '../../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks';
import {fetchGoodsType} from '../../../../features/challenge/goods/goodsThunk';
import { TGoodsType } from '../../../../features/challenge/goods/types';
const mockItems = [
  {name: 'Tofu Stir Fry', points: 18, tag: 'Repeat'},
  {name: 'Quinoa Salad', points: 20},
  {name: 'Paneer Wrap', points: 22, tag: 'High'},
  {name: 'Other Items', points: 0},
];

type RootStackParamList = {
  NutritionForm: undefined;
  ConsumItemList: undefined;
};

const GoodsForm = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mealType, setMealType] = useState('Breakfast');
  const [mealStyle, setMealStyle] = useState('Vegetarian');
  const [selectedItems, setSelectedItems] = useState(mockItems);
  const [description, setDescription] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const dispatch = useAppDispatch();
  const {goods} = useAppSelector(state => state.goods);
  console.log('goods----', goods);

  useEffect(() => {
    dispatch(fetchGoodsType()).unwrap();
  }, [dispatch]);

  const handleDateChange = (_: any, selected?: Date) => {
    const currentDate = selected || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleRemove = (index: number) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  const handleOpenCamera = async () => {
    if (!hasPermission) {
      const result = await requestPermission();
      if (result) {
        setOpenCamera(true);
      }
    } else {
      setOpenCamera(true);
    }
  };

  const renderItem = ({item, index}: any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
      <Text style={styles.points}>{item.points} pts</Text>
      <TextInput placeholder="gm" style={styles.inputSmall} />
      <TouchableOpacity onPress={() => handleRemove(index)}>
        <Text style={styles.remove}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>What did you eat today?</Text>

      {/* Date Picker */}
      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity
        style={styles.inputBox}
        onPress={() => setShowPicker(true)}>
        <Text>{date.toLocaleDateString('en-GB')}</Text>
        <CalenderIcon width={20} height={20} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Choose goods</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={mealType} onValueChange={setMealType}>
            {goods.map((it:TGoodsType, i:number) => {
                return <Picker.Item key={i.toString()} label={it.label} value={it.value} />;
            })}
        </Picker>
      </View>

      <Text style={styles.label}>Clothe Type</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={mealStyle} onValueChange={setMealStyle}>
          <Picker.Item label="Cotton Kurta" value="Vegetarian" />
          <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
          <Picker.Item label="Vegan" value="Vegan" />
        </Picker>
      </View>

      <Text style={styles.label}>Amount Spent INR</Text>
      <TextInput
        placeholder="1500"
        value={description}
        onChangeText={setDescription}
        style={styles.inputBox}
      />

      {/* Description */}
      <Text style={styles.label}>Add Description</Text>
      <View style={styles.inputWithIcon}>
        <View style={styles.inputWrapperBox}>
          <TextInput
            placeholder="Note (Optional)"
            value={description}
            onChangeText={setDescription}
            style={styles.inputBox}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonBox}
          onPress={() => {
            handleOpenCamera();
          }}>
          <GalleryaddIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>Earn 10 points by uploading a picture!</Text>
      <View style={styles.instructionsCard}>
        <Text style={styles.cardHeading}>Smart Green Move</Text>
        <Text style={styles.cardPoints}>
          Next time, tryrenting rarely used item to save money & emission
        </Text>
      </View>
      {photoUri && (
        <View style={{marginTop: 10}}>
          <Text style={styles.label}>Attached photo</Text>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 8,
              marginBottom: 8,
            }}>
            <Image
              source={{uri: 'file://' + photoUri}}
              style={{width: '100%', height: 200, borderRadius: 8}}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
      <CustomButton
        text={'Submit'}
        onPress={() => {
            //
        }}
        // showIcon={!isSubmitting}
        // iconName="arrow-forward"
        backgroundColor="#17a086"
        style={styles.submitButton}
      />
      {openCamera && device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device as CameraDevice}
          isActive={true}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F4F6FA',
    flex: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.Black2,
  },

  label: {
    marginBottom: 4,
    marginTop: 12,
    fontFamily: 'Montserrat-Medium',
    color: Colors.Black3,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  pickerBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  inputSmall: {
    backgroundColor: '#F0F0F0',
    padding: 4,
    borderRadius: 6,
    width: 60,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {flex: 1},
  tag: {
    backgroundColor: '#E6F0FF',
    color: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    fontSize: 12,
  },
  points: {
    marginRight: 6,
    fontWeight: '600',
    color: '#009966',
  },
  remove: {
    fontSize: 18,
    color: '#ff4d4d',
    marginLeft: 8,
  },
  note: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  submitBtn: {
    backgroundColor: '#00B386',
    padding: 14,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 16,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  inputWrapperBox: {
    width: '87%',
  },
  buttonBox: {
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  instructionsCard: {
    backgroundColor: Colors.LightGreenShades100,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: Colors.BlueShades300,
  },
  cardPoints: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: Colors.BlueShades300,
    marginTop: 4,
  },
});

export default GoodsForm;
