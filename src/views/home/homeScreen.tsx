import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListHeaderContent from './components/List.HeaderContent';
import VerticalClimateCard from '../../home-vertical-card';

const _item = {
  imageUri: 'https://picsum.photos/200/300',
  title: 'Take Your First Climate Action!',
  subtitle:
    'Upload a bill or photo to start earning points and reduce your carbon footprint today.',
  buttonText: 'Upload Now',
};

const list = [_item, _item, _item, _item];

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderContent}
        data={list}
        numColumns={2}
        renderItem={({item, index}) => (
          <VerticalClimateCard
            key={index.toString()}
            imageUri={item.imageUri}
            title={item.title}
            subtitle={item.subtitle}
            buttonText={item.buttonText}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  menuButton: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5,
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3D9D91',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
