const httpMocks = require('node-mocks-http')
const nock = require('nock')
const bot = require('../src/bot')

test('should reply welcome', async () => {
  const response = httpMocks.createResponse();

  await bot.handleUpdate({
    update_id: 1,
    message: {
      message_id: 1,
      text: '/start',
      entities: [
        {
          type: 'bot_command',
          offset: 0,
          length: 6,
        }
      ],
      chat: {
        id: 1,
      },
    },
  }, response)

  const data = response._getJSONData()
  expect(data.text).toBe('Welcome');
});

test('should reply Hey there', async () => {
  const response = httpMocks.createResponse();

  await bot.handleUpdate({
    update_id: 1,
    message: {
      message_id: 1,
      text: 'hi',
      chat: {
        id: 1,
      },
    },
  }, response)

  const data = response._getJSONData()
  expect(data.text).toBe('Hey there');
});

test('should reply Send me a sticker', async () => {
  const response = httpMocks.createResponse();

  await bot.handleUpdate({
    update_id: 1,
    message: {
      message_id: 1,
      text: '/help',
      entities: [
        {
          type: 'bot_command',
          offset: 0,
          length: 5,
        }
      ],
      chat: {
        id: 1,
      },
    },
  }, response)

  const data = response._getJSONData()
  expect(data.text).toBe('Send me a sticker');
});

test('should reply 👍', async () => {
  const response = httpMocks.createResponse();

  await bot.handleUpdate({
    update_id: 1,
    message: {
      message_id: 1,
      sticker: {
        file_id: 'id',
        file_unique_id: 'id',
      },
      chat: {
        id: 1,
      },
    },
  }, response)

  const data = response._getJSONData()
  expect(data.text).toBe('👍');
});
