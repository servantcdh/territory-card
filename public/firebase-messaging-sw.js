import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
  measurementId: firebase_measurementId,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestPermission = async () => {
  console.log("알림 권한 요청 중...");
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }
  console.log("알림 권한이 허용됨");
  const token = await getToken(messaging, { vapidKey: fcm_vapid });
  if (token) {
    console.log("token: ", token);
  } else {
    console.log("Can not get Token");
  }
  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();
