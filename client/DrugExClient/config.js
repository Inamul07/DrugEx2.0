import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyA_fTylPsFm0BdxcCDlU0IyaETTcH96uJU",
	authDomain: "drugexv2.firebaseapp.com",
	projectId: "drugexv2",
	storageBucket: "drugexv2.appspot.com",
	messagingSenderId: "1045932887910",
	appId: "1:1045932887910:web:d22eabca1f8a970b7642a7",
	measurementId: "G-W30K7YZJQ5",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
