import React from 'react';
import {View} from 'react-native';
import FormScreen from './src/screens/FormScreen';
import firebase from 'react-native-firebase';
const credentials = {
  clientId: '1091555359408-6djqg5kvohepdef6ro0noamgn2rst449.apps.googleusercontent.com',
  appId: '1:1091555359408:android:9a8b542bdc61663cb29975',
  apiKey: 'AIzaSyA95JCA0dbQzvn9GH2MH2LGv5KWUPsKLCU',
  storageBucket: 'captureimage-b8032.appspot.com',
  projectId: 'captureimage-b8032',
};

//firebase.initializeApp(credentials, 'DEFAULT_APP');
const App = () => {
  return (
    <View>
      <FormScreen />
    </View>
  );
};

export default App;
