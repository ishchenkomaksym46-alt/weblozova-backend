import { pool } from "../../db/db.js";

export const getArticleController = async (req, res) => {
    try {
        const articles = await pool.query('SELECT * FROM articles WHERE status = \'pending\'');

        return res.json({ success: true, data: articles.rows})
    } catch (error) {
        return res.json({ success: false, message: 'Серверна помилка. Спробуйте ще' });
    }
}