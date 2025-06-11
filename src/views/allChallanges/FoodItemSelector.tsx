import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    FlatList, StyleSheet, ScrollView
} from 'react-native';
import { FoodData } from '../../constants/constants';
import CustomButton from '../../common/button';

const FoodItemSelector = () => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [otherText, setOtherText] = useState('');

    const toggleSelect = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    const filteredData = FoodData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search items..."
                value={search}
                onChangeText={setSearch}
            />

            {/* Selected Items Pills */}
            <View style={styles.pillsContainer}>
                {selected.map(item => (
                    <View key={item} style={styles.pill}>
                        <Text style={styles.pillText}>{item}</Text>
                    </View>
                ))}
            </View>

            {/* Food List */}
            <ScrollView style={{ flex: 1 }}>
                {filteredData.map((item) => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.itemRow}
                        onPress={() => toggleSelect(item.name)}
                    >
                        {/* <Ionicons
              name={selected.includes(item.name) ? 'checkbox' : 'square-outline'}
              size={22}
              color="#00897B"
            /> */}
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.points}>{item.points} pts</Text>
                    </TouchableOpacity>
                ))}

                {/* Other input */}
                <TouchableOpacity
                    style={styles.itemRow}
                    onPress={() => toggleSelect('Other')}
                >
                    {/* <Ionicons
            name={selected.includes('Other') ? 'checkbox' : 'square-outline'}
            size={22}
            color="#00897B"
          /> */}
                    <Text style={styles.itemText}>Other</Text>
                </TouchableOpacity>
                {selected.includes('Other') && (
                    <TextInput
                        style={styles.otherInput}
                        placeholder="Enter item name"
                        value={otherText}
                        onChangeText={setOtherText}
                    />
                )}
            </ScrollView>

            <CustomButton
                text={"Done"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                iconName="arrow-forward"
                backgroundColor="#17a086"
                style={styles.submitButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 16,
        flex: 1,
        backgroundColor: '#F4F6FA',
    },
    searchBar: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        paddingLeft: 16,
    },
    pillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    pill: {
        backgroundColor: '#E0F2F1',
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginRight: 6,
        marginBottom: 6,
    },
    pillText: {
        color: '#00796B',
        fontSize: 13,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: 'white',
        marginBottom: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    itemText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    points: {
        color: '#00796B',
        fontWeight: '600',
    },
    otherInput: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 6,
        marginBottom: 12,
    },
    doneButton: {
        backgroundColor: '#009688',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 8,
    },
    doneText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 16,
    },
});

export default FoodItemSelector;