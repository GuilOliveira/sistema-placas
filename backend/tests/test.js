const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const placaRota = require('../rotas/placa'); 
const usuarioRota = require('../rotas/usuario');
const alertaRota = require('../rotas/alerta');

app.use('/api/placas', placaRota);
app.use('/api/usuario', usuarioRota);
app.use('/api/alerta', alertaRota);

test('POST /api/placas/cadastroPlaca deve retornar erro 401', async () => {
  const res = await request(app)
    .post('/api/placas/cadastroPlaca')
    .field('cidade', 'Cidade');

  expect(res.status).toBe(401);
});

test('GET /api/placas/relatorio/cidade/:cidade deve retornar status 200 com cidade existente', async () => {
  const cidade = 'Crato';
  const res = await request(app)
    .get(`/api/placas/relatorio/cidade/${cidade}`);

  expect(res.status).toBe(200);
});

test('GET /api/placas/constulta/:placa deve retornar erro 404', async () => {
  const placa = '*-* OwO xD';
  const res = await request(app)
    .get(`/api/placas/constulta/${placa}`);

  expect(res.status).toBe(404);
});

test('POST /api/usuario/cadastro deve retornar erro 500', async () => {
  const response = await request(app)
    .post('/api/usuario/cadastro')
    .send({ email: 'teste@example.com', senha: 'senha123' });
  expect(response.status).toBe(500);
});

test('POST /api/usuario/login deve retornar erro 500', async () => {
  const response = await request(app)
    .post('/api/usuario/login')
    .send({ nome: 'teste@example.com', senha: 'senha123' });
  expect(response.status).toBe(500);
});

test('POST /api/alerta deve retornar erro 401', async () => {
  const response = await request(app)
    .post('/api/alerta')
    .send({});
  expect(response.status).toBe(401);
});
