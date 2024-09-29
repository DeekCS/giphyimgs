import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import {getAuth} from 'firebase/auth';

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
} from '@env';

//NOTE: Use the following configuration for the firebaseConfig object

/* const firebaseConfig = {
  apiKey: "AIzaSyClXMEQaTNk-_kGLLxrG_2WzgdiPLKfdx4",
  authDomain: "giphy-e5d60.firebaseapp.com",
  projectId: "giphy-e5d60",
  storageBucket: "giphy-e5d60.appspot.com",
  messagingSenderId: "120685230254",
  appId: "1:120685230254:web:c143dcc1c0f0bf22b3953f",
  measurementId: "G-P52YQ77XEB"
}; 
*/

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export {authentication, firebase};
