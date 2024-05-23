# ALEHO-BOT 

<a href="https://ibb.co/px3Ld0f"><img src="https://i.ibb.co/px3Ld0f/aleho-bot.jpg" alt="aleho-bot"  width="180" height="180" style="border-radius: 50%;"/></a> 

https://aleho.sytes.net/

# 
![](https://img.shields.io/website?url=https%3A%2F%2Faleho.sytes.net)
![](https://img.shields.io/github/package-json/v/alehodev/aleho-bot)
![](https://img.shields.io/github/issues/alehodev/aleho-bot)

![](https://img.shields.io/github/last-commit/alehodev/aleho-bot) 
![](https://img.shields.io/github/commit-activity/y/alehodev/aleho-bot)

## 🤖 [Telegram Bot](https://t.me/Aleho_Bot "Agrega el contacto de Aleho-Bot en tu telegram")
Aleho-Bot es un bot de Telegram desarrollado en Node.js con capacidad de inteligencia artificial. Este bot te permitirá interactuar con él a través de mensajes en Telegram, brindándote respuestas inteligentes y funcionalidades adicionales.

####Comandos

    /start : Activa el bot.
    /stop : Desactiva el bot.
    /freegames : Busca juegos gratis!
    /serverstatus : Informacion sobre el servidor.
    /dolarhoy : Cotización de dolar en Argenzuela.
    /eurohoy : Cotización del euro en Argenzuela.
	/btc : Cotizacion de Bitcoin en diferentes traders.
	/eth : Cotizacion de Etherium en diferentes traders.
    /passwordgen : Genera una contraseña aleatoria.
	/resetcontext : Resetea el contexto de la charla con Aleho-Bot.

##### Cuando el bot se encuentre activo (/start) te enviará notificaciones sobre: 
- Juegos y DLS gratis.
- Cambios en la cotización del dolar blue.

## 🤖 [Discord Bot](https://discord.com/api/oauth2/authorize?client_id=745829100186501190&permissions=8&scope=bot "Agrega el contacto de Aleho-Bot en tu Discord")
Aleho-Bot tambien es un bot de Discord desarrollado en Node.js pero no cuenta con inteligencia artificial como el de telegram, solo responde a comandos.

####Comandos 

    /freegames : Busca juegos gratis!
    /serverstatus : Informacion sobre el servidor.
    /dolarhoy : Cotización de dolar en Argenzuela.
    /eurohoy : Cotización del euro en Argenzuela.
	/btc : Cotizacion de Bitcoin en diferentes traders.
	/eth : Cotizacion de Etherium en diferentes traders.
    /passwordgen : Genera una contraseña aleatoria.

## 📝 Contenido

- [Acerca de](#about)
- [Comenzando](#getting_started)
- [Built Using](#built_using)
- [Autor](#authors)

## 🧐 Acerca de... <a name = "about"></a>

Este proyecto de aprendizaje me permitió descubrir los beneficios y la simplicidad de programar con Node.js y Express.

### Resumen.

Servidor backend para implementar un bot en Telegram y Discord con diversas funcionalidades. Además, incluye integración con IA utilizando el modelo Gemini. Cuenta con un pequeño servidor web que actúa como panel de control del bot y un bot integrado con Botpress. Los datos son almacenados en MongoDB

### Trabajo a futuro.

A medida que surjan nuevas ideas, las iré integrando en este proyecto, enfocándome principalmente en mejoras e integración con IA.

## 🏁 Comenzando <a name = "getting_started"></a>

Estas instrucciones te ayudarán a tener una copia del proyecto funcionando en tu propia computadora para que puedas desarrollar y probarlo.

### Prerequisitos.

Para este proyecto se requiere Node.js v18 o superior y una base de datos MongoDB.

<u>Instalación de Node.js</u>

```
sudo apt update
sudo apt upgrade

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.nvm/nvm.sh

nvm install 20

node -v
```
<u>Instalación de MongoDB</u>
```
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

sudo apt update
sudo apt upgrade

sudo apt install -y mongodb-org

sudo systemctl start mongod

sudo systemctl status mongod
```

<u>Clonando el repositorio</u>

```
git clone https://github.com/Aleho84/aleho-bot
cd aleho-bot
```

<u>Instalando dependencias</u>

```
npm install
```

Configura las variables de entorno según tus necesidades, para ello deberas crear un archivo .env en la raiz del proyecto. Aquí tienes un ejemplo del archivo .env:

```
NODE_ENV=development
DEBUG=true
PROTOCOL=http
HOST=192.168.1.10
HOST_LOCAL=localhost
PORT=3000
SECRET_STRING=
PRIVATE_KEY=
TIME_SESSION=168
DB_MODE=mongoDB
MONGOOSE_URI=mongodb://localhost:27017/aleho-bot
MONGOOSE_URI_DEV=mongodb://localhost:27017/aleho-bot-dev
TELEGRAM_TOKEN=
TELEGRAM_TOKEN_DEV=
TELEGRAM_MAGIC_WORD=abracadabra!
DISCORD_TOKEN=
DISCORD_TOKEN_DEV=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_ID_DEV=
DISCORD_WEBHOCK_TOKEN=
DISCORD_WEBHOCK_ID=
BOT_INTERVAL=60
SPAM_MSG_DELAY=3
ASK_LIMIT=3
ASK_LIMIT_TIME=10
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
EMAIL_USER=
EMAIL_PASS=
GEMINI_API_KEY=
CERT=
KEY=
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@aleho84](https://github.com/aleho84)
