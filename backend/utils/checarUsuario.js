const { log } = require('console');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Configuração da conexão com o mongo
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }})
// A função checa se o usuário existe no bd, caso sim, o retorna. Caso não, retorna nulo
async function checarUsuario (x) {
    let usuario = null
    try {
        await client.connect();
        const collection = client.db("database").collection("usuarios");
        usuario = await collection.findOne({ login: x });
      } finally {
        await client.close();
      }
    return usuario;
  }

  module.exports = checarUsuario;