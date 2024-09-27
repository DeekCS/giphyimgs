type FavoriteItem = {
  id: string;
  title: string;
  description: string;
  images: {
    fixed_height_downsampled: {
      url: string;
    };
  };
};

export default FavoriteItem;
