const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  set,
  push,
  get
} = require("firebase/database");


const firebaseConfig = {
  apiKey: "AIzaSyCNKibqI60vc97_12kHp6DN-eKCdgndj7Y",
  authDomain: "botwpp-fd14d.firebaseapp.com",
  databaseURL: "https://botwpp-fd14d-default-rtdb.firebaseio.com",
  projectId: "botwpp-fd14d",
  storageBucket: "botwpp-fd14d.appspot.com",
  messagingSenderId: "149566144154",
  appId: "1:149566144154:web:3fb2dad8bf63b7b8ea6923",
  measurementId: "G-XYQV6HGZLB",
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);




const insertData = async function(objectInsert, routeDB) {
  let dataRef = ref(db, routeDB);
  const newPushRef = push(dataRef);

  try {
    await set(newPushRef, objectInsert);
    console.log("======> [DB/insertData] DADOS INSERIDOS  ", routeDB);
  } catch (error) {
    console.error("======> [DB/insetData] ERRO INSERIR DADOS! -> ", error);
    throw error;
  }
};

const getData = async (path) => {
 const dataRef = ref(db, path);

 try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    if (data !== null) {
      return data;
    } else {
      console.warn("======> [DB/getData] DADOS VAZIOS ");
      return null;
    }
 } catch (errorObject) {
    console.error("======> [DB/getData] ERRO  " + errorObject.code);
    throw errorObject;
 }
};

const getNode = async(idFlow) => {
    const dataRef = ref(db, "/Flows/flow1/regras/"+idFlow);

    try {
        const snapshot = await get(dataRef);
        const data = snapshot.val();
        if (data !== null) {
          return data;
        } else {
          console.warn("======> [DB/getFlow] DADOS VAZIOS ");
          return null;
        }
     } catch (errorObject) {
        console.error("======> [DB/getData] ERRO  " + errorObject.code);
        throw errorObject;
     }
}

const getFlowUsers = async() => {
    const dataRef = ref(db, "/FlowsUsers/5561999927159/5561982501719/flow1");

    try {
        const snapshot = await get(dataRef);
        const data = snapshot.val();
        if (data !== null) {
          return data;
        } else {
          console.warn("======> [DB/getFlow] DADOS VAZIOS ");
          return null;
        }
     } catch (errorObject) {
        console.error("======> [DB/getData] ERRO  " + errorObject.code);
        throw errorObject;
     }
}



const firebase = {
  insertData,
  getData,
  getNode,
  getFlowUsers
};

module.exports = firebase;
