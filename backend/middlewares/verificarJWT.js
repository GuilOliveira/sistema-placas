const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function verificarJWT(req, res, next) {
  // Pega o token do header da requisição
  const token = req.header('x-auth-token');

  // Se não houver token, retorna erro
  if (!token) {
    return res.status(401).json({ error: "Falha na autenticação" });
  }

  // Se o token não for valido, retorna erro, se não segue para a rota.
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Falha na autenticação" });
    }
    next();
  });
}

module.exports = verificarJWT;