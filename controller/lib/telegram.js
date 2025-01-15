const { getAxiosInstance } = require("./axios");
const { errorHandler } = require("./error");
const { handleRandomPercentage } = require("./randomPercentage");

const MY_TOKEN = "7702296920:AAEwkAmufKiYxsVHnKf40zXejK_6MYw7q28";
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

const sendMessage = (chatId, messageText) => {
  return axiosInstance
    .get("sendMessage", {
      chat_id: chatId,
      text: messageText,
    })
    .catch((ex) => {
      errorHandler(ex, "sendMessage", "axios");
    });
};

async function handleMessage(messageObj) {
  const messageText = messageObj.text || "";
  if (!messageText) {
    errorHandler("No message text", "handleMessage");
    return "";
  }

  try {
    const chatId = messageObj.chat.id;

    if (messageText.charAt(0) === "/") {
      const command = messageText.substr(1);

      switch (command) {
        case "start":
          return sendMessage(chatId, "Hi I'm Elohim's Loli");

        case "gay":
        case "sexy":
        case "lesbian":
        case "chamar":
          return handleRandomPercentage(
            chatId,
            messageText,
            messageObj,
            sendMessage,
          ); // Pass sendMessage here

        default:
          return sendMessage(chatId, "What tf are you saying bruhh");
      }
    } else {
      return sendMessage(chatId, messageText);
    }
  } catch (error) {
    errorHandler(error, "handleMessage");
    return sendMessage(
      messageObj.chat.id,
      "An error occurred while processing your message.",
    );
  }
}

module.exports = { sendMessage, handleMessage };
