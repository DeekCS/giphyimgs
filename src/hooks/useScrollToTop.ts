import {useState, useRef} from 'react';
import {Animated} from 'react-native';

const useScrollToTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: (event: {nativeEvent: {contentOffset: {y: number}}}) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollToTop(offsetY > 200);
      },
    },
  );

  return {scrollY, showScrollToTop, handleScroll};
};

export default useScrollToTop;
