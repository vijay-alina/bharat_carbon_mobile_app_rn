import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Button,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../common/button';
import CameraIcon from "../../images/icons/camera_icon.svg"
const AddNewMemberScreen = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [relationship, setRelationship] = useState('Sibling');
    const [profileImage, setProfileImage] = useState(null);

    // Example image picker handler (mock, replace with real)
    const handlePickImage = () => {
        // TODO: Add real image picking logic
        // For now, simulate an image being picked
        // setProfileImage('https://via.placeholder.com/100');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add New Member</Text>

            <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
                <Image
                  source={
                   
                      { uri: "https://avatar.iran.liara.run/public/boy?username=Ash" } // fallback image
                  }
                  style={styles.avatar}
                />
                <View style={styles.editIcon}>
                    <CameraIcon/>
                </View>
            </TouchableOpacity>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+91 78122 45690"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Relationship</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={relationship}
                    onValueChange={(value) => setRelationship(value)}
                >
                    <Picker.Item label="Sibling" value="Sibling" />
                    <Picker.Item label="Parent" value="Parent" />
                    <Picker.Item label="Child" value="Child" />
                    <Picker.Item label="Friend" value="Friend" />
                </Picker>
            </View>

            <CustomButton
                text={"Send Invite"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                iconName="arrow-forward"
                backgroundColor="#17a086"
                style={styles.submitButton}
            />
        </View>
    );
};

export default AddNewMemberScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F6FA',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    editIcon: {
        position: 'absolute',
        bottom: -5,
        right: 0,
        // backgroundColor: '#00C897',
        // borderRadius: 10,
        padding: 4,
    },
    label: {
        fontWeight: '500',
        marginBottom: 6,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 32,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: '#00C897',
        paddingVertical: 14,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 16,
    },
});
