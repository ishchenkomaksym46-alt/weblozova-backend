import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import pool from './db/db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ORIGIN
}));

app.listen(process.env.PORT, () => console.log('Server started!'));