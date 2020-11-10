import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RootComponent from './App/App';
import firebase from 'firebase/app';
import { createStore, applyMiddleware } from "redux"; //Redux neccessities
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import combinedReducer from "./Redux/reducers/combinedReducers";

//Setup Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDgNp4bVTjGzkFd0OgnPMdcgjK7jESUohk",
  authDomain: "thangam-super-market.firebaseapp.com",
  databaseURL: "https://thangam-super-market.firebaseio.com",
  projectId: "thangam-super-market",
  storageBucket: "thangam-super-market.appspot.com",
  messagingSenderId: "72123817790",
  appId: "1:72123817790:web:a05b06fbd0b17c8f7e166f",
  measurementId: "G-YQJXPD6EEY"
};
firebase.initializeApp(firebaseConfig);

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
export let store = createStore(
  combinedReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe( () => {
  saveToLocalStorage(store.getState());
});


ReactDOM.render(
  <React.StrictMode>
    <Provider  store={store} ><RootComponent /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

