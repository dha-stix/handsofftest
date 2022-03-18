import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB8ckwUFZKQAgrTIm5SysAK-wHuTFD-F_M",
  authDomain: "otp-verify-51e77.firebaseapp.com",
  projectId: "otp-verify-51e77",
  storageBucket: "otp-verify-51e77.appspot.com",
  messagingSenderId: "730334807667",
  appId: "1:730334807667:web:9768d8fbb5aa4144c94c06",
  measurementId: "G-CDPY3RHEHZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth}
