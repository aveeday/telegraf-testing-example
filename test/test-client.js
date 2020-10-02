const httpMocks = require('node-mocks-http')
const nock = require('nock')
const EventEmitter = require('events')

const ee = new EventEmitter()

function getRandomId() {
  return Math.floor(Math.random() * Math.floor(Math.pow(10, 10)));
}

nock('https://api.telegram.org/bot123456')
  .post('/sendMessage')
  .reply((uri, requestBody) => {
    ee.emit('sendMessage', {
      method: 'sendMessage',
      ...requestBody,
    })
    return [
      200,
      { ok: true },
    ]
  })

class TestClient {
  constructor(bot) {
    this.bot = bot
    this.received = []
    this.clientId = getRandomId()
    this.updateId = 0
    ee.on('sendMessage', data => {
      if (data.chat_id != this.clientId) return
      this.received.push({
        data,
      })
    })
  }

  async send(params) {
    const response = httpMocks.createResponse()
    const update = {
      update_id: ++this.updateId,
      ...params,
    }
    if (update.message && !update.message.message_id) {
      update.message.message_id = this.updateId
    }
    if (update.message && !update.message.chat) {
      update.message.chat = {
        id: this.clientId,
      }
    }

    await this.bot.handleUpdate(update, response)

    this.received.push({
      data: response._getJSONData(),
    })
  }

  sendCommand(command) {
    const params = {
      message: {
        text: command,
        entities: [
          {
            type: 'bot_command',
            offset: 0,
            length: command.length,
          }
        ],
      },
    }
    return this.send(params)
  }

  sendText(text) {
    const params = {
      message: {
        text,
      },
    }
    return this.send(params)
  }

  sendSticker(sticker) {
    const params = {
      message: {
        sticker,
      },
    }
    return this.send(params)
  }
}

module.exports = TestClient
