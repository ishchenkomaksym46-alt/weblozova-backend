import { pool } from "../../db/db.js";

export const getUserDataController = async (req, res) => {
    try {
        const user = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);

        if(user.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Користувач не знайдений!' });
        }

        const email = user.rows[0].email;

        return res.json({ success: true, email})
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Помилка серверу. Спробуйте ще' });
    }
}