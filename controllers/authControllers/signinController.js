import { pool } from '../../db/db.js';
import bcrypt from 'bcrypt';

export const signInController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash]);
        res.json({ success: true, message: 'Користувач створений' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Користувач вже існує' })
    }
}