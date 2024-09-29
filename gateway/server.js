const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Redirigir tráfico a los microservicios
app.use('/users', (req, res) => {
  axios({
    url: process.env.USERS_SERVICE_URL + req.url,
    method: req.method,
    data: req.body
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.status(500).send(error.message);
  });
});

app.use('/products', (req, res) => {
  axios({
    url: process.env.PRODUCTS_SERVICE_URL + req.url,
    method: req.method,
    data: req.body
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.status(500).send(error.message);
  });
});

app.use('/orders', (req, res) => {
  axios({
    url: process.env.ORDERS_SERVICE_URL + req.url,
    method: req.method,
    data: req.body
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.status(500).send(error.message);
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
