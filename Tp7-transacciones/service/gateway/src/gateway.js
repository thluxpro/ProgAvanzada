const { Kafka } = require('kafkajs');
const WebSocket = require('ws');

const kafka = new Kafka({ brokers: [process.env.KAFKA_BROKER || 'kafka:9092']});
const consumer = kafka.consumer({ groupId: 'gateway-group' });

const wss = new WebSocket.Server({ port: 4001 });
console.log('Gateway WS running on port 4001');

const subs = new Map(); // ws -> { tx, user }

wss.on('connection', ws => {
  ws.on('message', msg => {
    const data = JSON.parse(msg.toString());
    if (data.action === 'subscribeTx') subs.set(ws, { tx: data.transactionId });
    if (data.action === 'subscribeUser') subs.set(ws, { user: data.userId });
  });

  ws.on('close', () => subs.delete(ws));
});

async function start() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'txn.events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const key = message.key.toString();
      const ev = JSON.parse(message.value.toString());
      for (const [ws, sub] of subs.entries()) {
        if ((sub.tx && sub.tx === key) || (sub.user && ev.payload && ev.payload.userId === sub.user)) {
          ws.send(JSON.stringify(ev));
        }
      }
    },
  });
}

start();