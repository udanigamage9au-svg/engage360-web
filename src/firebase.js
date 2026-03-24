import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDtTi4IW7r8R0jjwRh06lKckPr-usdmmyA",
  authDomain: "engage360-transit.firebaseapp.com",
  databaseURL: "https://engage360-transit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "engage360-transit",
  storageBucket: "engage360-transit.firebasestorage.app",
  messagingSenderId: "948633166025",
  appId: "1:948633166025:web:d45b54d7111a7367f7ad18"
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)