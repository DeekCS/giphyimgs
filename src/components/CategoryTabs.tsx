import React from 'react';
import {FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {categories} from '../data/categories';

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (key: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => (
  <FlatList
    data={categories}
    horizontal
    keyExtractor={item => item.key}
    renderItem={({item}) => (
      <TouchableOpacity
        style={[
          styles.tabItem,
          selectedCategory === item.key && styles.activeTab,
        ]}
        onPress={() => onSelectCategory(item.key)}>
        <Text
          style={[
            styles.tabText,
            selectedCategory === item.key && styles.activeTabText,
          ]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabBar}
  />
);

const styles = StyleSheet.create({
  tabBar: {
    paddingVertical: 15,
    backgroundColor: '#1F1F1F',
  },
  tabItem: {
    height: 40,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6C4FFF',
  },
  activeTab: {
    backgroundColor: '#6C4FFF',
    borderColor: 'transparent',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
  },
});

export default CategoryTabs;
