import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2WG0LUwLCDqmylgezCZ0aH5Q8vTaXTKU",
  authDomain: "pl-predictor-13a6d.firebaseapp.com",
  projectId: "pl-predictor-13a6d",
  storageBucket: "pl-predictor-13a6d.appspot.com",
  messagingSenderId: "286908896536",
  appId: "1:286908896536:web:dabd76b4faaa72a98cfa6d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function savePredictions(gw, player, preds) {
  await setDoc(doc(db, "predictions", `gw_${gw}_${player}`), { predictions: preds });
}

export async function getPredictions(gw, player) {
  const ref = doc(db, "predictions", `gw_${gw}_${player}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().predictions : [];
}
