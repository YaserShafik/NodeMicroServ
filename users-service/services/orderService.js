const axios = require('axios');

const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`http://orders-service/orders/user/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error('Error al obtener los pedidos del usuario');
  }
};

module.exports = { getOrdersByUserId };