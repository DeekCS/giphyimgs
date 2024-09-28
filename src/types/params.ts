import gifs from "./gifs";

export type RootStackParamList = {
    Home: undefined;
    Favorites: undefined;
    ItemDetails: { item: gifs };
  };