import React from "react";
import { View, Text, Image } from "react-native";

type ManifestItemProps = {
    icon: React.ReactNode;
    title: string;
}

const ManifestItem: React.FC<ManifestItemProps> = ({ icon, title }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            {icon}
            <Text style={{ marginLeft: 10 }}>{title}</Text>
        </View>
    );
};
export default ManifestItem;