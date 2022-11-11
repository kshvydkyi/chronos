import express from 'express'

import UserController from '../controller/UserController.js'
import RoleController from '../controller/RoleController.js'
import CategoryController from '../controller/CategoryController.js'
import AuthController from '../controller/AuthController.js'
import CalendarController from '../controller/CalendarController.js'
import EventController from '../controller/EventController.js'

import upload_Avatar_Image from '../utils/upload_Avatar_Image.js';

const router = express.Router();


//auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout/:token', AuthController.logout);
router.get('/auth/active/:token', AuthController.activeEmail);

//users
router.get('/users', UserController.select_all);
router.get('/users/:user_id', UserController.select_by_id);
router.post('/users', UserController.create);
router.delete('/users/:user_id', UserController.delete_by_id);
router.patch('/users/avatar/:access_token', upload_Avatar_Image.single('image'), UserController.update_avatar);

//roles
router.get('/roles', RoleController.select_all);
router.get('/roles/:role_id', RoleController.select_by_id);
router.post('/roles', RoleController.create);
router.delete('/roles/:role_id', RoleController.delete_by_id);

//categories
router.get('/categories', CategoryController.select_all);
router.get('/categories/:category_id', CategoryController.select_by_id);
router.post('/categories', CategoryController.create);
router.delete('/categories/:category_id', CategoryController.delete_by_id);

//events
router.get('/events', EventController.select_all);
router.get('/events/:event_id', EventController.select_by_id);
router.post('/events', EventController.create);
router.delete('/events/:event_id', EventController.delete_by_id);

//calendars
router.get('/calendars', CalendarController.select_all);
router.get('/calendars/:calendar_id', CalendarController.select_by_id);
router.post('/calendars', CalendarController.create);
router.delete('/calendars/:calendar_id', CalendarController.delete_by_id);

export default router;