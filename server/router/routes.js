
import express from 'express'

import UserController from '../controller/UserController.js'
import RoleController from '../controller/RoleController.js'
import CategoryController from '../controller/CategoryController.js'
import AuthController from '../controller/AuthController.js'

const router = express.Router();


//auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);

//users
router.get('/users', UserController.select_all);
router.get('/users/:user_id', UserController.select_by_id);

//roles
router.get('/roles', RoleController.select_all);
router.get('/roles/:role_id', RoleController.select_by_id);

//categories
router.get('/categories', CategoryController.select_all);
router.get('/categories/:category_id', CategoryController.select_by_id);

export default router;