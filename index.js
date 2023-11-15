const { Client } = require('whatsapp-web.js'); // npm install whatsapp-web.js 
const client = new Client();
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const moment = require('moment-timezone'); // npm install moment moment-timezone


const config = {
    timezone: 'America/Bogota',  // Zona horaria de Colombia  
};

async function run() {
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('Bien! WhatsApp conectado.');
  });

  await client.initialize();


  
function saludo() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();

  let saudacao;

  if (hora >= 6 && hora < 12) {
    saudacao = "Buenos dias!";
  } else if (hora >= 12 && hora < 17) {
    saudacao = "Buenas tardes!";
  } else {
    saudacao = "Buenas noches!";
  }

  return saudacao;
}



  const delay = ms => new Promise(res => setTimeout(res, ms));

  

  client.on('message', async msg => {
   
    if (
      msg.body.match(/(buenas noches|buenos dias|menu|buenas tardes|hola|dia|informacion|Imagen|videos|audios|teste)/i) &&
      msg.from.endsWith('@c.us')
      
    )
    {
      const chat = await msg.getChat();
      chat.sendStateTyping();
      await delay(1000);
      const menuMessage = "Seleccione una opción:\n1. Saludar\n2. Ver la hora";
      await client.sendMessage(msg.from, menuMessage);    
    
    }
    else if (msg.body.trim() === "1") {
        // OPCIÓN 1
        const saudacoes = saludo();
        await client.sendMessage(msg.from, `${saudacoes}`);
    } else if (msg.body.trim() === "2") {
        // OPCIÓN 2
        const currentDateTime = moment().tz(config.timezone).format('YYYY-MM-DD HH:mm:ss');
        await client.sendMessage(msg.from, `La fecha y hora actual es: ${currentDateTime}`);
    }
    


  });
  
  function waitForResponse() {
    return new Promise((resolve, reject) => {
      client.on('message', async msg => {
        if (msg.from.endsWith('@c.us')) {
          resolve(msg);
        }
      });
    });
  }
}  
run().catch(err => console.error(err));




