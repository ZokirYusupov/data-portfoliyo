const { Router } = require('express');
const { getUserCreatePage, createUser, getAllUsersPage } = require('../controllers/userController');
const fileUpload = require('../utils/fileUpload')
const adminMiddlewares = require('../middlewares/admin')

const router = Router();

router.get('/', adminMiddlewares, getAllUsersPage)
router.get('/add',adminMiddlewares, getUserCreatePage)
router.post('/add',adminMiddlewares, fileUpload.single('userImage'), createUser)


module.exports = router