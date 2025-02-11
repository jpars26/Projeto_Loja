import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";


// 🔹 Substitua estas informações com os detalhes do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyArKkv5mdETGWODP5eSedQiJd8UR8ctEmg",
  authDomain: "producao-loja.firebaseapp.com",
  projectId: "producao-loja",
  storageBucket: "producao-loja.firebasestorage.app",
  messagingSenderId: "357482644114",
  appId: "1:357482644114:web:d677038963ac7e0cef9c4b",
  measurementId: "G-EK2Z71YQLB"
};

// Inicializa Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);
// Exporta Firestore e funções necessárias
export { db, collection, addDoc, serverTimestamp };
