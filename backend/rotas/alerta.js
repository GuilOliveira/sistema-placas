const express = require('express');
const verificarJWT = require('../middlewares/verificarJWT.js')
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}))

// Rota de alerta
router.post('/',verificarJWT, (req, res) => {  
// Caso acionado, emite um alerta para os usuários
    var io = req.app.get('socketio');
    io.emit('alerta', 'Inconsistência de dados ou equipamentos foram detectados no sistema');
    res.json({ mensagem: 'Alerta enviado com sucesso' });
  });

module.exports = router;