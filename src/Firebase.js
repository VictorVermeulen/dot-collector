import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCPQSqwLYTBt_vS7oNf_mAF2M6wl0i9O88",
  authDomain: "dot-collector-e0a3f.firebaseapp.com",
  databaseURL: "https://dot-collector-e0a3f.firebaseio.com",
  projectId: "dot-collector-e0a3f",
  storageBucket: "",
  messagingSenderId: "982995103484"
}

firebase.initializeApp(config);
export default firebase;
