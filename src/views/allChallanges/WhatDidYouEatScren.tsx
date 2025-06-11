import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';

const WhatDidYouEatScrenForm = () => {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [mealType, setMealType] = useState('Breakfast');
    const [mealStyle, setMealStyle] = useState('Vegetarian');
    const [description, setDescription] = useState('');

    const handleDateChange = (_: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            {/* Date Picker */}
            <Text style={styles.label}>Select Date</Text>
            <TouchableOpacity
                style={styles.inputWithIcon}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateText}>
                    {date.toLocaleDateString('en-GB')}
                </Text>
                {/* <Ionicons name="calendar-outline" size={20} /> */}
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            {/* Meal Type Picker */}
            <Text style={styles.label}>Select Meal Type</Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={mealType}
                    onValueChange={(itemValue) => setMealType(itemValue)}
                >
                    <Picker.Item label="Breakfast" value="Breakfast" />
                    <Picker.Item label="Lunch" value="Lunch" />
                    <Picker.Item label="Dinner" value="Dinner" />
                </Picker>
            </View>

            {/* Meal Style Picker */}
            <Text style={styles.label}>Choose Meal Style</Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={mealStyle}
                    onValueChange={(itemValue) => setMealStyle(itemValue)}
                >
                    <Picker.Item label="Vegetarian" value="Vegetarian" />
                    <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
                    <Picker.Item label="Vegan" value="Vegan" />
                </Picker>
            </View>

            {/* Select Items Consumed (Placeholder) */}
            <Text style={styles.label}>Select Items Consumed</Text>
            <TouchableOpacity style={styles.inputWithIcon}>
                <Text style={styles.placeholder}>Add items</Text>
                {/* <Ionicons name="add" size={20} /> */}
            </TouchableOpacity>

            {/* Description Input */}
            <Text style={styles.label}>Add Description</Text>
            <View style={styles.inputWithIcon}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Note (Optional)"
                    value={description}
                    onChangeText={setDescription}
                />
                {/* <Ionicons name="image-outline" size={20} /> */}
            </View>

            {/* Hint Text */}
            <Text style={styles.note}>Earn 10 points by uploading a picture!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#F4F6FA',
        flex: 1,
    },
    label: {
        marginBottom: 4,
        fontWeight: '600',
        color: '#333',
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    dateText: {
        color: '#333',
    },
    placeholder: {
        color: '#888',
    },
    textInput: {
        flex: 1,
        marginRight: 8,
        color: '#333',
    },
    note: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 4,
    },
});

export default WhatDidYouEatScrenForm;
