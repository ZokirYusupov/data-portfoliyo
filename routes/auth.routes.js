const { Router } = require('express');
const { getLoginPage, loginUser, logout } = require('../controllers/authController');
const router = Router();

router.get('/login', getLoginPage)
router.post('/login', loginUser)
router.get('/logout', logout)

module.exports = router