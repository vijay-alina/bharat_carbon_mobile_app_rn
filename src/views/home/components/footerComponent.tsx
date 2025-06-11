import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ArticleCard from './home-artical-card';
import {TArticle} from '../types';

const items: TArticle[] = [
  {
    imageUri: 'https://picsum.photos/200/300',
    category: 'TECHNOLOGY',
    description: 'This is a description of article 1',
  },
  {
    imageUri: 'https://picsum.photos/200/300',
    category: 'SPORTS',
    description: 'This is a description of article 1',
  },
  {
    imageUri: 'https://picsum.photos/200/300',
    category: 'TECHNOLOGY',
    description: 'This is a description of article 1',
  },
];

const ListFooterContent = () => {
  return (
    <FlatList
      data={items}
      horizontal
      contentContainerStyle={styles.containerContainer}
      renderItem={({item, index}) => <ArticleCard item={item} index={index} />}
    />
  );
};

const styles = StyleSheet.create({
  containerContainer: {
    paddingVertical: 10,
  },
});

export default ListFooterContent;
