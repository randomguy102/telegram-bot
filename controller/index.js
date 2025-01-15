const { handleMessage, sendMessage } = require("./lib/telegram");
const { errorHandler } = require("./lib/error");

async function handler(req, method) {
  try {
    if (method === "GET") {
      return "Hello Get";
    }
    const { body } = req;
    if (body && body.message) {
      const messageObj = body.message;
      await handleMessage(messageObj);
      return "Success";
    }

    return "Unknown request";
  } catch (error) {
    errorHandler(error, "mainIndexHandler");
  }
}

module.exports = { handler };
