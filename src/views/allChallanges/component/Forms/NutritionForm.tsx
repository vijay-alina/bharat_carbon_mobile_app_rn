import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import AddIcon from '../../../../images/icons/add_plus.svg'
import ConsumItemList from './ConsumeItemList'
import { useNavigation, NavigationProp } from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import { Camera, CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const mockItems = [
    { name: 'Tofu Stir Fry', points: 18, tag: 'Repeat' },
    { name: 'Quinoa Salad', points: 20 },
    { name: 'Paneer Wrap', points: 22, tag: 'High' },
    { name: 'Other Items', points: 0 },
];

type RootStackParamList = {
    NutritionForm: undefined;
    ConsumItemList: undefined;
};

const NutritionForm = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mealType, setMealType] = useState('Breakfast');
    const [mealStyle, setMealStyle] = useState('Vegetarian');
    const [selectedItems, setSelectedItems] = useState(mockItems);
    const [description, setDescription] = useState('');
    const [openCamera, setOpenCamera] = useState(false);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back')

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
    }

    const renderItem = ({ item, index }: any) => (
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
        <View style={styles.container}>
            <Text style={styles.header}>What did you eat today?</Text>

            {/* Date Picker */}
            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => setShowPicker(true)}>
                <Text>{date.toLocaleDateString('en-GB')}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker value={date} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleDateChange} />
            )}

            {/* Meal Type */}
            <Text style={styles.label}>Select Meal Type</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={mealType} onValueChange={setMealType}>
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                </Picker>
            </View>

            {/* Meal Style */}
            <Text style={styles.label}>Choose Meal Style</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={mealStyle} onValueChange={setMealStyle}>
                    <Picker.Item label="Vegetarian" value="Vegetarian" />
                    <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
                    <Picker.Item label="Vegan" value="Vegan" />
                </Picker>
            </View>

            {/* Meal Items */}
            <Text style={styles.label}>Select Items Consumed</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => navigation.navigate('ConsumItemList')}>
                <Text>Add items</Text>
                <AddIcon width={20} height={20} fill="#007AFF" />
            </TouchableOpacity>

            <FlatList
                data={selectedItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
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
                <TouchableOpacity style={styles.buttonBox} onPress={() => { handleOpenCamera() }}>
                    <GalleryaddIcon width={24} height={24} />
                </TouchableOpacity>

            </View>


            <Text style={styles.note}>Earn 10 points by uploading a picture!</Text>

            <CustomButton
                text={"Submit"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                // iconName="arrow-forward"
                backgroundColor="#17a086"
                style={styles.submitButton}
            />
            { openCamera && device && <Camera
                style={StyleSheet.absoluteFill}
                device={device as CameraDevice}
                isActive={true}
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#F4F6FA',
        flex: 1
    },
    header: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 16
    },

    label: {

        fontWeight: '500',
        marginBottom: 4,
        marginTop: 12
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
        overflow: 'hidden'
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
    itemText: { flex: 1 },
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
        color: '#009966'
    },
    remove: {
        fontSize: 18,
        color: '#ff4d4d',
        marginLeft: 8
    },
    note: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 8
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
    }
});

export default NutritionForm;
