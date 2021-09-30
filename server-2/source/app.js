const redis = require('redis');
const express = require('express');
const http = require('http');
const { promisify } = require('util');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publisher = redis.createClient();
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

app.post('/', async (req, res) => {
  await setAsync(`cupom_${new Date().getTime()}`, JSON.stringify(req.body));

  publisher.publish('canal-teste', 'new request');

  return res.status(201).end();
});


const server = http.createServer(app);

server.listen(3501, () => console.log('TÁ RODANDO O SERVER 2 NA PORTA 3501'));