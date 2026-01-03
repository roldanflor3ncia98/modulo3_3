var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// GET /
router.get('/', function (req, res) {
  res.render('index');
});

// POST /
router.post('/', async function (req, res) {
  console.log('BODY:', req.body);

  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'roldanflorencia98@gmail.com',
    subject: 'CONTACTO WEB',
    html:
      nombre +
      ' se contacto a través de la web y quiere más informacion a este correo : ' +
      email +
      '<br> Además, hizo este comentario : ' +
      mensaje +
      '<br> Su tel es : ' +
      tel
  };

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);


  res.render('index', {
    message: 'Mensaje enviado correctamente' });
});

module.exports = router;
