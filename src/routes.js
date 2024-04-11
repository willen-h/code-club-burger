import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import CategoryController from './app/controllers/CategoryController';
import UserController from './app/controllers/UserController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);


routes.use(authMiddleware);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);


routes.post('/category', CategoryController.store);
routes.get('/category', CategoryController.index);

routes.post('/orders', OrderController.store);

export default routes;
