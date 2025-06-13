import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Button, Platform, ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../../../common/button';
import { Colors } from '../../../../constants/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import GalleryaddIcon from '../../../../images/icons/gallery-add.svg';
import { Camera, CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import CalenderIcon from '../../../../images/icons/Calendar_Days.svg'
import CheckBoxIcon from '../../../../images/icons/checkbox.svg'
import UncheckedCheckBoxIcon from '../../../../images/icons/checkbox_uncheck.svg'

type RootStackParamList = {
    MobilityForm: undefined;
    ConsumItemList: undefined;
};

const LeisureForm = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mealType, setMealType] = useState('Electricity');
    const [description, setDescription] = useState('');
    const [openCamera, setOpenCamera] = useState(false);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const { hasPermission, requestPermission } = useCameraPermission()
    const device = useCameraDevice('back');
    const [unitsConsumed, setUnitsConsumed] = useState('');
    const [isSolarInstalled, setIsSolarInstalled] = useState(false);
    const [solarUnits, setSolarUnits] = useState('');

    const handleDateChange = (_: any, selected?: Date) => {
        const currentDate = selected || date;
        setShowPicker(false);
        setDate(currentDate);
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

    return (
        <ScrollView style={styles.container}>


            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity style={styles.inputBox} onPress={() => setShowPicker(true)}>
                <Text>{date.toLocaleDateString('en-GB')}</Text>
                <CalenderIcon width={24} height={24} />
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker value={date} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleDateChange} />
            )}
            <Text style={styles.label}>Choose Usage Category</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={mealType} onValueChange={setMealType}>
                    <Picker.Item label="Electricity" value="Electricity" />
                    <Picker.Item label="By Car" value="By Car" />
                    <Picker.Item label="Two wheeler" value="Two wheeler" />
                </Picker>
            </View>
            <Text style={styles.label}>No of people involved</Text>
            <TextInput
                placeholder="3"
                value={unitsConsumed}
                onChangeText={setUnitsConsumed}
                keyboardType="numeric"
                style={styles.inputBox}
            />
            <Text style={styles.label}>Amount spent (INR)</Text>
            <TextInput
                placeholder="Enter total units"
                value={unitsConsumed}
                onChangeText={setUnitsConsumed}
                keyboardType="numeric"
                style={styles.inputBox}
            />

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

            <View style={styles.instructionsCard}>
                           <Text style={styles.cardHeading}>Did you know?</Text>
                           <Text style={styles.cardPoints}>Swapping screen time for outdoor time reduces energy use & boosts your health! </Text>
                       </View>

            <CustomButton
                text={"Submit"}
                onPress={() => { }}
                backgroundColor="#17a086"
                style={styles.submitButton}
            />

            {openCamera && device && <Camera
                style={StyleSheet.absoluteFill}
                device={device as CameraDevice}
                isActive={true}
            />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#F4F6FA',
        flex: 1
    },
    label: {
        marginBottom: 4,
        marginTop: 12,
        fontFamily: 'Montserrat-Medium',
        color: Colors.Black3
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
    note: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 8,
        fontFamily: 'Montserrat-SemiBold',
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 16,
    },
    checkboxContainer: {
        marginTop: 12,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 8,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#17a086',
        borderColor: '#17a086',
    },
    checkboxLabel: {
        fontSize: 14,
        color: Colors.Black3,
        fontFamily: 'Montserrat-Medium',
        marginLeft: 8,
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

export default LeisureForm;
