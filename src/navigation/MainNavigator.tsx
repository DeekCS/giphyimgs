import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FavoriteScreen from '../screens/FavoriteScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import {RootStackParamList} from '../types/params';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        headerStyle: {backgroundColor: '#6C4FFF'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitle: 'GIFs',
        headerBackgroundContainerStyle: {backgroundColor: '#6C4FFF'},
        headerTitleAlign: 'left',
        headerRight: () => (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <Icon name="hearto" size={24} color="#FFF" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon name="search1" size={24} color="#FFF" style={styles.icon} />
            </TouchableOpacity>
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="Favorites"
      component={FavoriteScreen}
      options={{headerShown: true, title: 'Favorites'}}
    />
    <Stack.Screen
      name="ItemDetails"
      component={ItemDetailsScreen}
      options={{
        headerShown: true,
        title: 'Item Details',
      }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{headerShown: true, title: 'Search GIFs'}}
    />
  </Stack.Navigator>
);

export default MainNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  icon: {
    marginLeft: 20,
  },
});
