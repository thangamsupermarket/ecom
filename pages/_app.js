import '../styles/globals.css'
import '../styles/css/bootstrap.min.css';
import '../styles/css/bootstrap-utilities.min.css';
import '../styles/css/bootstrap-reboot.min.css';
import '../styles/css/bootstrap-grid.min.css';
// import '../styles/js/bootstrap.bundle.min.js';
// import '../styles/js/bootstrap.esm.min.js';
// import '../styles/js/bootstrap.min.js';

import Layout from './../components/Layout';
import * as React from 'react';
import firebase from 'firebase/app';
export const firebaseConfig = {
  apiKey: "AIzaSyA8hmDcEUSDbkf96N960_VmIero8U_T-Bk",
  authDomain: "clay-2-vessel.firebaseapp.com",
  databaseURL: "https://clay-2-vessel.firebaseio.com",
  projectId: "clay-2-vessel",
  storageBucket: "clay-2-vessel.appspot.com",
  messagingSenderId: "950554130284",
  appId: "1:950554130284:web:5db40d8fbf99111ac4e549",
  measurementId: "G-R9YR7600X7"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const MyApp = ({ Component, pageProps })  => {

  const [isComponentMounted, setIsComponentMounted] = React.useState(false);
  React.useEffect(() => {
    setIsComponentMounted(true);
  }, []);

  return (
      isComponentMounted && <Layout>
      <Component {...pageProps} />
      </Layout>
    
);
}

export default MyApp;
