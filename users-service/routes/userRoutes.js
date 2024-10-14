// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUserById);
router.delete('/:id', verifyToken, userController.deleteUserById);

module.exports = router;