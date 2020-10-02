const { Telegraf } = require('telegraf')

const bot = new Telegraf('123456')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', async (ctx) => {
  ctx.webhookReply = false
  await ctx.reply('Hey there')
  ctx.webhookReply = true
  return ctx.reply('How are you?')
})

module.exports = bot
