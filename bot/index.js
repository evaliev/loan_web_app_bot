const { Telegraf } = require('telegraf');

// Изменить на токен своего тестового бота
const TOKEN = '5574575386:AAEXCjS-cnsXyPvAG5KjJgsq8HSL5r191hI';

const bot = new Telegraf(TOKEN);

// Ссылка на деплой фронта
const webAppUrl = 'https://evaliev.github.io/loan_web_app_bot';

bot.start((ctx) =>
  ctx.reply('Привет, кликай ниже и оставляй заявку на кредит', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Оставить заявку на кредит', web_app: { url: webAppUrl } }],
      ],
    },
  }),
);

bot.launch();