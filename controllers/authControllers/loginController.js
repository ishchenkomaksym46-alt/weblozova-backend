import { pool } from "../../db/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT id, email, password, role FROM users WHERE email = $1', 
            [email]
        );

        if(result.rows.length === 0) {
            return res.status(402).json({ success: false, message: 'Користувача не знайдено' });
        }

        const valid = await bcrypt.compare(password, result.rows[0].password);

        if(!valid) {
            return res.status(402).json({ success: false, message: 'Неправильний пароль або електрона пошта' });
        }

        const token = jwt.sign(
            { id: result.rows[0].id, role: result.rows[0].role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ token });
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ success: false, message: 'Неправильний пароль або електрона пошта!' });
    }
}