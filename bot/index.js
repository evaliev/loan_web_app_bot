const { Telegraf } = require('telegraf');

// Изменить на токен своего тестового бота
const TOKEN = '5754027180:AAGPOC6wWM2FHvJ4-KVhQHtOpNnqF0fMGOU';

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
