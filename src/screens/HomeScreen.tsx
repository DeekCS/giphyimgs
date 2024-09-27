import React, {useState, useEffect, useRef} from 'react';
import {FlatList, ActivityIndicator, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import gifs from '../types/gifs';

import {useCategoryGifs} from '@hooks/useCategoryGifs';
import useScrollToTop from '@hooks/useScrollToTop';

import {truncateText} from '@utils/textUtils';

import GifItem from '@components/GifItem';
import ScrollToTopButton from '@components/ScrollToTopButton';
import CategoryTabs from '@components/CategoryTabs';

const HomeScreen: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');
  const [gifs, setGifs] = useState<gifs[]>([]);
  const {data, isLoading, isError, isFetching} = useCategoryGifs(
    page,
    selectedCategory,
  );

  const flatListRef = useRef<FlatList<gifs>>(null);

  const {scrollY, showScrollToTop, handleScroll} = useScrollToTop();

  useEffect(() => {
    if (data?.data && !isFetching) {
      setGifs(prevGifs => [...prevGifs, ...data.data]);
    }
  }, [data, isFetching]);

  const loadMoreGifs = () => {
    if (!isFetching && data?.data?.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  if (isLoading && page === 0) {
    return <ActivityIndicator size="large" color="#6C4FFF" />;
  }

  if (isError) {
    return (
      <Text style={{color: 'red', textAlign: 'center'}}>
        Error loading GIFs
      </Text>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, padding: 8, backgroundColor: '#121212'}}>
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={key => {
          setSelectedCategory(key);
          setPage(0);
          setGifs([]);
        }}
      />

      <FlatList
        ref={flatListRef}
        data={gifs}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={({item}) => (
          <GifItem item={{...item, title: truncateText(item.title, 20)}} />
        )}
        numColumns={2}
        onEndReached={loadMoreGifs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#6C4FFF" /> : null
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {showScrollToTop && <ScrollToTopButton onPress={scrollToTop} />}
    </SafeAreaView>
  );
};

export default HomeScreen;
