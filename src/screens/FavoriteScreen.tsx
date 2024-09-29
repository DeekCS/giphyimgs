import React, {useLayoutEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectFavoriteItems} from '../store/selectors/favoritesSelectors';
import GifItem from '@components/GifItem';
import {truncateText} from '@utils/textUtils';
import {useNavigation} from '@react-navigation/native';
import {clearFavorites} from '../store/slices/favoritesSlice';

const FavoriteScreen: React.FC = () => {
  const favoriteItems = useSelector(selectFavoriteItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Use useLayoutEffect to set the header options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Favorites (${favoriteItems.length})`,
      headerRight: () => (
        <>
          {favoriteItems.length > 0 && (
            <TouchableOpacity onPress={handleClearFavorites}>
              <Text style={{color: 'red', marginRight: 16}}>Clear All</Text>
            </TouchableOpacity>
          )}
        </>
      ),
    });
  }, [navigation, dispatch, favoriteItems]);

  const handleClearFavorites = () => {
    Alert.alert('Remove All Favorites', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove All',
        onPress: () => clearAllFavorites(),
        style: 'destructive',
      },
    ]);
  };

  const clearAllFavorites = () => {
    dispatch(clearFavorites());
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
      }}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({item}) => (
          <GifItem item={{...item, title: truncateText(item.title, 20)}} />
        )}
        numColumns={2}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <Text style={{color: '#fff', textAlign: 'center', marginTop: 16}}>
            No favorites added yet
          </Text>
        }
      />
    </View>
  );
};

export default FavoriteScreen;
