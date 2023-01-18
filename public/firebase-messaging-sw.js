importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDs3eQZvuJ5OrbHfIbnwhnBVDKg506b9kY",
  authDomain: "territory-card-1a893.firebaseapp.com",
  projectId: "FIREBASE_PROJECT_ID=territory-card-1a893",
  storageBucket: "territory-card-1a893.appspot.com",
  messagingSenderId: "17211172675",
  appId: "1:17211172675:web:49fe15fa88fa13deb4b1f6",
  measurementId: "G-LB5SWKS8KZ",
};

firebase.initializeApp(firebaseConfig);
firebase.messaging();

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == "/" && "focus" in client) return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow("https://www.jwterritory.co.kr");
      }
    })
  );
});