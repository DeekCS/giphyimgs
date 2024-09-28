import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {useSearchGifs} from '@hooks/useSearchGifs';
import GifItem from '@components/GifItem';
import gifs from '../types/gifs';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [gifs, setGifs] = useState<gifs[]>([]);
  const [page, setPage] = useState<number>(0);

  const {data, isLoading, isError, isFetching} = useSearchGifs(query, page);

  React.useEffect(() => {
    if (data && !isFetching) {
      setGifs(prevGifs => [...prevGifs, ...data]);
    }
  }, [data, isFetching]);

  const loadMoreGifs = () => {
    if (!isFetching && data?.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for GIFs"
        value={query}
        onChangeText={text => {
          setQuery(text);
          setGifs([]);
          setPage(0);
        }}
        onSubmitEditing={() => loadMoreGifs()}
      />

      {isLoading && page === 0 && (
        <ActivityIndicator size="large" color="#6C4FFF" />
      )}

      {isError && (
        <Text style={styles.errorText}>Error fetching search results</Text>
      )}

      <FlatList
        data={gifs}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({item}) => <GifItem item={item} />}
        numColumns={2}
        onEndReached={loadMoreGifs}
        onEndReachedThreshold={0.5} // Trigger the load more function when halfway through the list
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#6C4FFF" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#121212',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default SearchScreen;
