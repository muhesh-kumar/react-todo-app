import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBPnYDohbTP2M-P-71D-a_wDyGU-fOjV-0',
  authDomain: 'react-todo-ap-6afab.firebaseapp.com',
  projectId: 'react-todo-ap-6afab',
  storageBucket: 'react-todo-ap-6afab.appspot.com',
  messagingSenderId: '968438617450',
  appId: '1:968438617450:web:c3b89e97a2f0c251134113',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
