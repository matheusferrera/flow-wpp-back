const express = require("express")
const routerMessage = require("./Routers/message.router.js")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use("/message", routerMessage)






// Set up the interval to execute the function every 10000 ms (10 seconds)
// const intervalId = setInterval(async() => {
//   console.log('======> CHECAGEM DE FLOWS', new Date(), '<====== // ', Date.now());
//   firebase.getFlowUsers().then(resp => {

//     if(resp.nextTime < Date.now()){
//         console.log('----> HORA DE ENVIAR MENSAGEM!!!')
//         firebase.getNode(resp.timeStep).then(respNode => {console.log("RESP DO GETNODE -> ", respNode)})
        
//     }
//     console.log('----> Consulta DB concluida', new Date())
//     console.log(resp)
//   })
  
// }, 10000);

app.listen(3000, async () => { //Criacao do arquivo para armazenar dados
    try {
        console.log("===========> SERVIDOR LIGADO - ", new Date, " <===========")
    } catch(err){
        console.log(err)
    }
    
})


// Make sure to clear the interval when the server is stopped
process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log('Interval cleared');
  process.exit();
});