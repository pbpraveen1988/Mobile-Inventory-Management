app.factory('DATABASE', function () {
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjGmmJzh_ehu75neQh6GBbXOasxYhEM3w",
    authDomain: "inventory-8bd80.firebaseapp.com",
    databaseURL: "https://inventory-8bd80.firebaseio.com",
    storageBucket: "inventory-8bd80.appspot.com",
    messagingSenderId: "922940935912"
  };
  firebase.initializeApp(config);
  return firebase;
  });
