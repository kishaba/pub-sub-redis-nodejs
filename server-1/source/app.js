const redis = require('redis');
const express = require('express');
const http = require('http');
const { promisify } = require('util');

const app = express();

const subscriber = redis.createClient();
const client = redis.createClient();

const keysAsync = promisify(client.keys).bind(client);
const getAsync = promisify(client.get).bind(client);
const deleteAsync = promisify(client.del).bind(client);

const getRegisters = async () => {
  return await keysAsync('cupom*');
};

const getRegister = async (register) => {
  return await getAsync(register);
};

const deleteRegisters = async (register) => {
  await deleteAsync(register);
};

subscriber.subscribe('canal-teste');

subscriber.on('message', async (channel, message) => {
  console.log(`Mensagem: "${message}" - do canal: ${channel}`);
  const registers = await getRegisters();

  for (let i = 0;i < registers.length;i++) {
    const register = await getRegister(registers[i]);
    console.log(register, new Date());

    await deleteRegisters(registers[i]);

    console.log(`Register ${registers[i]} deleted ... `);
  }
});


const server = http.createServer(app);

server.listen(3500, () => console.log('TÁ RODANDO O SERVER 1 NA PORTA 3500'));