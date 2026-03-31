import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { signInController } from './controllers/authControllers/signinController.js';
import auth from './middlewares/authMiddleware.js';
import { loginController } from './controllers/authControllers/loginController.js';
import { getUserDataController } from './controllers/mainPageControllers/getUserDataController.js';
import { getUserRoleController } from './controllers/mainPageControllers/getUserRoleController.js';
import { addArticleController } from './controllers/mainPageControllers/addArticleController.js';
import roleMiddleware from './middlewares/roleMiddleware.js';
import { getArticleController } from './controllers/articleControllers/getArticleController.js';
import { acceptRequestController } from './controllers/articleControllers/acceptRequestController.js';
import { declineRequestController } from './controllers/articleControllers/declineRequestController.js';
import { getDeclinedArticlesController } from './controllers/articleControllers/getDeclinedArticlesController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ORIGIN
}));

app.post('/signin', signInController);
app.post('/login', loginController);
app.get('/getUserData', auth, getUserDataController);
app.get('/checkRole', auth, getUserRoleController);
app.post('/addArticle', auth, addArticleController);
app.get('/getArticles', auth, roleMiddleware, getArticleController);
app.get('/acceptRequest', auth, roleMiddleware, acceptRequestController);
app.get('/declineRequest', auth, roleMiddleware, declineRequestController);
app.get('/getDeclinedArticles', auth, roleMiddleware, getDeclinedArticlesController);

app.listen(process.env.PORT, () => console.log('Server started!'));
