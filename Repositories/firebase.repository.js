const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  set,
  child,
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



const sendMessage = async function(messageObject, routeDB) {
  const idFirebase = messageObject.idMessage.substring(6);
  let dataRef = ref(db, routeDB);
  const newPushRef = child(dataRef, idFirebase);

  try {
    await set(newPushRef, messageObject);
    console.log("======> [DB/sendMessage] Mensagem salva no DB  ", routeDB);
  } catch (error) {
    console.error("======> [DB/sendMessage] ERRO ao salvar mensagem no DB! -> ", error);
    throw error;
  }
};

const getTemplate = async function(templateId, routeDB) {
    const dataRef = ref(db, routeDB + "/" + templateId);
        try {
            const snapshot = await get(dataRef);
            const data = snapshot.val();
            if (data !== null) {
                console.warn("======> [DB/getTemplate] Encontrou template - ", templateId);
            return data;
            } else {
            console.warn("======> [DB/getTemplate] DADOS VAZIOS ");
            return null;
            }
        } catch (errorObject) {
            console.error("======> [DB/getTemplate] ERRO de acesso  " + errorObject);
            return errorObject
        }
  };



const firebase = {
  sendMessage,
  getTemplate
};

module.exports = firebase;
