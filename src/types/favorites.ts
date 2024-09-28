type FavoriteItem = {
  alt_text: string;
  id: string;
  title: string;
  images: {
    fixed_height_downsampled: {
      url: string;
    };
  };
  user: {
    description: string;
    display_name: string;
  };
};

export default FavoriteItem;
