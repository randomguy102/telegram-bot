const moment = require("moment");

const context = {
  userData: {},
};

async function handleRandomPercentage(
  chatId,
  messageText,
  messageObj,
  sendMessage,
) {
  let type;
  let user;
  let randPercent;

  console.log(context);

  // Determine the type (gay, sexy, lesbian, or chamar)
  if (messageText.match(/^\/gay/)) {
    type = "gay";
  } else if (messageText.match(/^\/sexy/)) {
    type = "sexy";
  } else if (messageText.match(/^\/lesbian/)) {
    type = "lesbian";
  } else if (messageText.match(/^\/chamar/)) {
    type = "chamar";
  } else {
    type = "unknown";
  }

  // Get the user's name
  if (messageObj.reply_to_message) {
    user = messageObj.reply_to_message.from.first_name;
  } else {
    user = messageObj.from.first_name;
  }

  // Get today's date in YYYY-MM-DD format
  const todayDate = moment().format("YYYY-MM-DD");

  // Check if we need to reset user data at midnight (reset happens if the stored date doesn't match today's date)
  if (context.userData.lastResetDate !== todayDate) {
    // Reset all stored values for the day
    context.userData = { lastResetDate: todayDate }; // Preserve the current date as the last reset date
  }

  // Generate percentage for different types (gay, sexy, lesbian, chamar)
  if (type === "gay") {
    if (
      context.userData[`${chatId}_geiPercent`] &&
      todayDate === context.userData[`${chatId}_geiNumberDate`]
    ) {
      randPercent = context.userData[`${chatId}_geiPercent`];
    } else {
      randPercent = Math.floor(Math.random() * (100 - 10 + 1)) + 10; // Random number between 10 and 100
      context.userData[`${chatId}_geiPercent`] = randPercent;
      context.userData[`${chatId}_geiNumberDate`] = todayDate;
    }
  } else if (type === "sexy") {
    if (
      context.userData[`${chatId}_semxPercent`] &&
      todayDate === context.userData[`${chatId}_semxNumberDate`]
    ) {
      randPercent = context.userData[`${chatId}_semxPercent`];
    } else {
      randPercent = Math.floor(Math.random() * (100 - -50 + 1)) + -50; // Random number between -50 and 100
      context.userData[`${chatId}_semxPercent`] = randPercent;
      context.userData[`${chatId}_semxNumberDate`] = todayDate;
    }
  } else if (type === "lesbian") {
    if (
      context.userData[`${chatId}_lesbPercentage`] &&
      todayDate === context.userData[`${chatId}_lesbNumberDate`]
    ) {
      randPercent = context.userData[`${chatId}_lesbPercentage`];
    } else {
      randPercent = Math.floor(Math.random() * (100 - 0 + 1)) + 0; // Random number between 0 and 100
      context.userData[`${chatId}_lesbPercentage`] = randPercent;
      context.userData[`${chatId}_lesbNumberDate`] = todayDate;
    }
  } else if (type === "chamar") {
    if (
      context.userData[`${chatId}_chamarPercentage`] &&
      todayDate === context.userData[`${chatId}_chamarNumberDate`]
    ) {
      randPercent = context.userData[`${chatId}_chamarPercentage`];
    } else {
      randPercent = Math.floor(Math.random() * (100 - -50 + 1)) + -50; // Random number between -50 and 100
      context.userData[`${chatId}_chamarPercentage`] = randPercent;
      context.userData[`${chatId}_chamarNumberDate`] = todayDate;
    }
  }

  // Send the result back to the user
  return sendMessage(chatId, `Today ${user} is ${randPercent}% ${type}`);
}

// Export the function
module.exports = { handleRandomPercentage };
