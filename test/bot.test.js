const TestClient = require('./test-client')
const bot = require('../src/bot')

let client

beforeEach(function() {
  client = new TestClient(bot)
})

test('should reply welcome', async () => {
  await client.sendCommand('/start')

  expect(client.received[0].data.text).toBe('Welcome')
});

test('should reply two messages', async () => {
  await client.sendText('hi')

  expect(client.received[0].data.text).toBe('Hey there');
  expect(client.received[1].data.text).toBe('How are you?');
});

test('should reply Send me a sticker', async () => {
  await client.sendCommand('/help')

  expect(client.received[0].data.text).toBe('Send me a sticker');
});

test('should reply 👍', async () => {
  await client.sendSticker({
    file_id: 'id',
    file_unique_id: 'id',
  })

  expect(client.received[0].data.text).toBe('👍');
});
