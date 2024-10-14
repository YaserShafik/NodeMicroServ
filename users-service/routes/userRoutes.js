// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUserById);
router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;