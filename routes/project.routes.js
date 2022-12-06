const { Router } = require('express');
const projectUp = require('../utils/projectUpload')
const { getProjectAddUserPage, createProjectUser, getOneProjectPage, getAllProjects, getUserAnotherProjectPage, projectLike } = require('../controllers/projectController');

const adminMiddlewares = require('../middlewares/admin')

const router = Router();

router.get('/another/:id', getUserAnotherProjectPage)
router.get('/projects', getAllProjects)
router.get('/add/:id',adminMiddlewares, getProjectAddUserPage )
router.post('/add/:id', adminMiddlewares, projectUp.single('projectImage'), createProjectUser )
router.get('/:id', getOneProjectPage)
router.get('/like/:id', projectLike)

module.exports = router