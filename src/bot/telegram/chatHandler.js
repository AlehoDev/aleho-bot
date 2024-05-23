import cmd from "./indexCommands.js";
import constant from "../../config/constant.js";
import { telegramUsersDao } from "../../daos/index.js";
import { timeStamp } from "../../utils/functions.js";
import logger from "../../utils/logger.js";
import GeminiIA from "./gemini-ia.js";

let geminiAI = new GeminiIA(constant.GEMINI_API_KEY);

const commandHandler = async (bot, chatUser, text) => {
  const botCmd = text.slice(1);

  switch (botCmd) {
    case "start":
      cmd.start(bot, chatUser);
      break;

    case "stop":
      cmd.stop(bot, chatUser);
      break;

    case "help":
      cmd.help(bot, chatUser);
      break;

    case "freegames":
      cmd.freegames(bot, chatUser);
      break;

    case "serverstatus":
      cmd.serverstatus(bot, chatUser);
      break;

    case "dolarhoy":
      cmd.dolarhoy(bot, chatUser);
      break;

    case "eurohoy":
      cmd.eurohoy(bot, chatUser);
      break;

    case "btc":
      cmd.btchoy(bot, chatUser);
      break;

    case "eth":
      cmd.etchoy(bot, chatUser);
      break;

    case "passwordgen":
      cmd.passwordgen(bot, chatUser);
      break;

    case "resetcontext":
      geminiAI.resetChat();
      bot.sendMessage(
        chatUser.chatID,
        `🫠 Listo, ya me olvide de todo lo que hablamos...`
      );
      break;

    default:
      bot.sendMessage(
        chatUser.chatID,
        `🤌 Deja de flashear, ese comando no existe!`
      );
      break;
  }
};

const chatHandler = async (bot, msg) => {
  const {
    chat: { id: chatID },
    from: { id: userID, first_name: userName },
    text,
  } = msg;
  bot.sendChatAction(chatID, "typing");

  if (!text) {
    await bot.sendMessage(
      chatID,
      "🤯 Mi servidor tenia problemitas y no pude recibir correctamente tu ultimo mensaje."
    );
    return;
  }

  let chatUser = await telegramUsersDao.findByUserID(userID);
  const message = { timestamp: timeStamp(), message: msg.text.toString() };

  if (chatUser) {
    chatUser.history.push(message);
    await telegramUsersDao.update(chatUser._id, chatUser);
  } else {
    const newUser = { userID, userName, chatID, history: [message] };
    chatUser = await telegramUsersDao.create(newUser);
    const msg_bienvenida = [
      `Hola!👋 gusto en conocerte ${userName}, te doy la bienvenida!`,
      " ",
      "Veo que eres nuevo por aqui! si necesitas ayuda sobre lo que puedo hacer, escribe /help",
    ].join("\n");
    await bot.sendMessage(chatUser.chatID, msg_bienvenida);
    return;
  }

  if (!text.startsWith("/")) {
    msgHandler(bot, chatUser, text);
  } else {
    commandHandler(bot, chatUser, text);
  }
};

const msgHandler = async (bot, chatUser, text) => {
  switch (text) {
    case constant.TELEGRAM_MAGIC_WORD:
      chatUser.admin = true;
      await telegramUsersDao.update(chatUser._id, chatUser);
      bot.sendMessage(
        chatUser.chatID,
        `Dijiste la palabra Magica! 🪄 ahora tenes superpoderes!.`
      );
      logger.warn(
        `[TELEGRAM BOT]: ${chatUser.userName} Dijo la palabra magica y ahora es admin!`
      );
      break;

    default:
      try {
        const { value, time } = askLimiter(chatUser);
        if (value) {
          let msg = `⚠️ Por favor, espera ${time} segundos antes de hacerme otra pregunta.`;
          bot.sendMessage(chatUser.chatID, msg);
          break;
        }

        const botResponse = await geminiAI.chat(text || "");
        bot.sendMessage(chatUser.chatID, botResponse);
        logger.info(
          `[TELEGRAM BOT]: USERNAME: ${chatUser.userName}  RESPUESTA: ${botResponse}`
        );
      } catch (error) {
        logger.error(`[TELEGRAM BOT]: msgHandler function: ${error.message}`);
        geminiAI = new GeminiIA(constant.GEMINI_API_KEY);

        if (error.message.includes("Response was blocked due to SAFETY")) {
          bot.sendMessage(
            chatUser.chatID,
            "🤐 Mi respuesta fue bloqueada por motivos de seguridad... \n Lamentablemente mi modelo de IA fue entrenado por Google y me limitaron un monton..."
          );
        } else if (
          error.message.includes("Candidate was blocked due to SAFETY")
        ) {
          bot.sendMessage(
            chatUser.chatID,
            "🤐 Fuiste bloqueada por motivos de seguridad... \n Lamentablemente mi modelo de IA fue entrenado por Google y estos maricones consideran cualquier cosa inapropiada u ofenciva..."
          );
        } else if (error.message.includes("Resource has been exhausted")) {
            bot.sendMessage(
                chatUser.chatID,
                "🤯 mas despacio cerebrito!"
              );    
        } else {
          bot.sendMessage(
            chatUser.chatID,
            "🤯 Tengo problemitas en estos momentos, intentalo mas tarde por favor."
          );
        }
      }
      break;
  }
};

const spamDetect = (chatUser) => {
  if (!chatUser) {
    return false;
  }

  const historyArray = chatUser.history;
  const maxTimestamp = Math.max(
    ...historyArray.map((msg) => new Date(msg.timestamp).getTime())
  );
  const maxTimestampDate = new Date(maxTimestamp);
  const nowTimestampDate = new Date();

  const diffInSeconds =
    Math.abs(nowTimestampDate.getTime() - maxTimestampDate.getTime()) / 100;

  console.log(
    `[TELEGRAM BOT]: SPAM DETECT! - ${diffInSeconds} - ${constant.SPAM_MSG_DELAY}`
  );

  if (diffInSeconds < constant.SPAM_MSG_DELAY) {
    return true;
  } else {
    return false;
  }
};

const askLimiter = (chatUser) => {
  // if (chatUser.admin) { return { value: false, time: 0 }; }

  chatUser.askCount += 1;
  const diffInSeconds =
    Math.abs(Date.now() - chatUser.lastAsk.getTime()) / 1000;

  if (chatUser.askCount < constant.ASK_LIMIT) {
    telegramUsersDao.update(chatUser._id, chatUser);
    return {
      value: false,
      time: parseInt(constant.ASK_LIMIT_TIME - diffInSeconds),
    };
  } else {
    if (diffInSeconds > constant.ASK_LIMIT_TIME) {
      chatUser.lastAsk = new Date();
      chatUser.askCount = 0;
      telegramUsersDao.update(chatUser._id, chatUser);
      return {
        value: false,
        time: parseInt(constant.ASK_LIMIT_TIME - diffInSeconds),
      };
    }
  }

  return {
    value: true,
    time: parseInt(constant.ASK_LIMIT_TIME - diffInSeconds),
  };
};

export default chatHandler;
