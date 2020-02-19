import firebase from "firebase";
import logger from "../logger";

export const firebaseConfig = {
    apiKey: 'AIzaSyB6f6M6hzuQUnVnKU1gB2fDf8MTp1MiYcE',
    projectId: 'ffh-mobile-ed933',
    authDomain: "ffh-mobile-ed933.firebaseapp.com",
    databaseUrl: "https://ffh-mobile-ed933/firebaseio.com",
    storageBucket: "ffh-mobile-ed933.appspot.com",
    messagingSenderId: "522649098617",
    appId: "1:522649098617:ios:006c576494f84597f6b7a8",
    // https://fcm.googleapis.com/fcm/send',
}

export const initMessaging = async () => {
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.requestPermission()
    .then(function() {
      logger.log('permission granted');
      if (messaging)
      return messaging.getToken();
      //httpService.updatePushToken();
    })
    .then(function(token) {
      logger.log(token);
    })
    .catch(function(err){
      logger.error('Error Occured during requesting messaging permission', err);
    })

    messaging.onMessage(function(payload: any) {
        logger.log('onMessage', payload);
    })
  }