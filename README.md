# Giphy Images App

Giphy Images is a React Native app that allows users to browse, search, and view GIFs from the Giphy API. Users can view trending GIFs, search for GIFs by keyword, and save their favorite GIFs to view later.

## Features

- **Browse Trending GIFs**: View the most popular trending GIFs from Giphy.—**Search GIFs**: Find specific GIFs by searching with a query.
  — **Favorites**: Save and view your favorite GIFs.

## Screens

1. **Home Screen**: Browse trending GIFs.
2. **Search Screen**: Search for GIFs by keyword.
3. **Favorites Screen**: View and manage favorite GIFs.
4. **GIF Details Screen**: View individual GIF details with a shared element transition.

## Getting Started

### Prerequisites

- **Node.js**: `>=18`
- **Yarn** (optional, but recommended for dependency management)

### Setup Instructions

1. Login Account:

   ```bash
   username: admin@gmail.com
   password: admin12345
   ```

1. Clone the repository:

   ```bash
   git clone https://github.com/DeekCS/giphyimgs
   ```

1. Navigate to the project directory:

   ```bash
   cd giphyimgs
   ```

1. Install the required dependencies:

   Using Yarn:

   ```bash
   yarn install
   ```

   Using npm:

   ```bash
   npm install
   ```

1. Install CocoaPods for iOS (if using MacOS):

   ```bash
   cd ios && pod install && cd ..
   ```

1. Create a `.env` file in the root of the project and add your Giphy API key and Firebase configuration:

   ```bash
   GIPHY_API_KEY='your_giphy_api_key' ### 9Y8pgdIcBQsIhgOGM8bwfH7C0i4H5wNs
   ```

1. Start the Metro bundler:

   ```bash
   npx react-native start --reset-cache
   ```

1. Run the app:

   For iOS:

   ```bash
   npx react-native run-ios
   ```

   For Android:

   ```bash
   npx react-native run-android
   ```

## Usage

- **Home Screen**: View trending GIFs from the Giphy API.
- **Search GIFs**: Use the search icon in the header to search for GIFs by keyword.
- **View GIF Details**: Tap on a GIF to view its details with a smooth shared element transition.
- **Favorites**: Tap the heart icon to save a GIF to favorites.

## Technologies Used

- **React Native**: Mobile development framework.
- **Giphy API**: Fetch GIFs based on trending and search queries.
- **React Navigation**: Handles screen transitions and navigation.
- **Axios**: API calls to Giphy.

## Project Structure

```bash
giphy-images/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── screens/             # Screen components for each route
│   ├── services/            # API calls and services
│   ├── types/               # TypeScript types and interfaces
│   ├── App.tsx              # Root app component
│
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── babel.config.js          # Babel configuration
├── tsconfig.json            # TypeScript configuration
├── README.md                # Project documentation
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or suggestions.

### Steps to Contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.
