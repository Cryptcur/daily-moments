import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPI5cx0dLZSUeDAp27JTwyN0JR2q_H5Ng",
  authDomain: "daily-moments-c5475.firebaseapp.com",
  databaseURL: "https://daily-moments-c5475.firebaseio.com",
  projectId: "daily-moments-c5475",
  storageBucket: "daily-moments-c5475.appspot.com",
  messagingSenderId: "1072328638116",
  appId: "1:1072328638116:web:e5c93b127a70773969b031"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
