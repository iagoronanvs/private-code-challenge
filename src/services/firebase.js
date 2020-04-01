import app from 'firebase/app';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyCN1wMbwb5cN7ROpAIs1BuaMHAsRugeN-c',
  authDomain: 'private-code-challange.firebaseapp.com',
  databaseURL: 'https://private-code-challange.firebaseio.com',
  projectId: 'private-code-challange',
  storageBucket: 'private-code-challange.appspot.com',
  messagingSenderId: '237725154803',
  appId: '1:237725154803:web:706d5f9c781dc1de42a686'
};

const firebase = app.initializeApp(firebaseConfig);
const Api = firebase.firestore();

export default Api;
