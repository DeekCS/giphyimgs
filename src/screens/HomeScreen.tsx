import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {categories} from '../data/categories';
import {useCategoryGifs} from '../hooks/useCategoryGifs';

const {width} = Dimensions.get('window');

type gifs = {
  id: string;
  title: string;
  description: string;
  images: {
    fixed_height_downsampled: {
      url: string;
    };
  };
};

const HomeScreen: React.FC = () => {
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [gifs, setGifs] = useState<gifs[]>([]);
  const {data, isLoading, isError, isFetching} = useCategoryGifs(
    page,
    selectedCategory,
  );

  const flatListRef = useRef<FlatList>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (data?.data && !isFetching) {
      setGifs(prevGifs => [...prevGifs, ...data.data]);
    }
  }, [data]);

  const imageSize = width / 2 - 12;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const renderGifItem = ({item}: {item: any}) => (
    <View style={styles.gridItem}>
      <FastImage
        style={{...styles.gifImage, height: imageSize, width: imageSize}}
        source={{
          uri: item.images.fixed_height_downsampled.url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />

      <Text style={styles.title}>
        {truncateText(item.title || 'No Title Available', 20)}
      </Text>

      <Text style={styles.description}>
        {item.description || 'No description available'}
      </Text>
    </View>
  );

  const loadMoreGifs = () => {
    if (!isFetching && data?.data.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: (event: {nativeEvent: {contentOffset: {y: number}}}) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 200) {
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      },
    },
  );

  const renderTabItem = ({item}: {item: {key: string; label: string}}) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        selectedCategory === item.key && styles.activeTab,
      ]}
      onPress={() => {
        setSelectedCategory(item.key);
        setPage(0);
        setGifs([]);
      }}>
      <Text
        style={[
          styles.tabText,
          selectedCategory === item.key && styles.activeTabText,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading && page === 0) {
    return <ActivityIndicator size="large" color="#6C4FFF" />;
  }

  if (isError) {
    return <Text>Error loading GIFs</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Render Category Tabs */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={item => item.key}
        renderItem={renderTabItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      />

      <FlatList
        ref={flatListRef}
        data={gifs}
        keyExtractor={(item, index) => item.id + '-' + index}
        renderItem={renderGifItem}
        numColumns={2}
        onEndReached={loadMoreGifs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="small" color="#6C4FFF" /> : null
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {showScrollToTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={scrollToTop}>
          <Text style={styles.scrollToTopText}>↑ Top</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#121212',
  },
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
  gridItem: {
    margin: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gifImage: {
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  description: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6C4FFF',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  scrollToTopText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
