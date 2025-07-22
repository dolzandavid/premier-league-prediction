import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc
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

async function saveData(collectionName, docId, data) {
  await setDoc(doc(db, collectionName, docId), data);
}

async function updateData(collectionName, docId, data) {
  await updateDoc(doc(db, collectionName, docId), data);
}

async function getData(collectionName, docId) {
  const ref = doc(db, collectionName, docId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

async function getAllDocs(collectionName) {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map(doc => ({ id: doc.id, data: doc.data() }));
}

window.firebaseHelpers = {
  saveData,
  getData,
  getAllDocs,
  updateData
};

window.getFixtures = async function(gw) {
  const data = await firebaseHelpers.getData("fixtures", `gw_${gw}`);
  return data ? data.fixtures : [];
}

window.saveFixtures = async function(gw, fixtures) {
  await firebaseHelpers.saveData("fixtures", `gw_${gw}`, { fixtures });
}

window.getPredictions = async function(gw, player) {
  const data = await firebaseHelpers.getData("predictions", `gw_${gw}_${player}`);
  return data ? data.predictions : [];
}

window.savePredictions = async function(gw, player, preds) {
  await firebaseHelpers.saveData("predictions", `gw_${gw}_${player}`, { predictions: preds });
}

window.getResults = async function(gw) {
  const data = await firebaseHelpers.getData("results", `gw_${gw}`);
  return data ? data.results : [];
}

window.saveResults = async function(gw, results) {
  await firebaseHelpers.saveData("results", `gw_${gw}`, { results });
}

window.getDeadline = async function(gw) {
  const data = await firebaseHelpers.getData("deadlines", `gw_${gw}`);
  return data ? data.deadline : "";
}

window.saveDeadline = async function(gw, dateStr) {
  await firebaseHelpers.saveData("deadlines", `gw_${gw}`, { deadline: dateStr });
}

window.getPassword = async function(player) {
  const data = await firebaseHelpers.getData("passwords", player);
  return data ? data.password : null;
}

window.savePassword = async function(player, pw) {
  await firebaseHelpers.saveData("passwords", player, { password: pw });
}
