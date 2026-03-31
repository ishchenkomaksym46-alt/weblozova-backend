import jwt from 'jsonwebtoken';
import { pool } from '../db/db.js';
import 'dotenv/config';

export default async function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ success: false, message: 'Authorization header is required.' });
    }

    const [type, token] = header.split(' ');

    if (type !== 'Bearer') {
        return res.status(401).json({ success: false, message: 'Bearer token is required.' });
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Bearer token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const res = await pool.query('SELECT id, email, role FROM users WHERE id = $1', [decoded.id]);

        if(res.rows.length === 0) {
            return res.status(402).json({ success: false, message: 'Incorrect email or password' });
        }

        req.user = res.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid or expired token!' });
    }
}