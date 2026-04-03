import { pool } from "../../db/db.js";

export const getFullInfoController = async (req, res) => {
    const { id } = req.query;

    try {
        const articles = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);

        return res.json({ success: true, data: articles.rows });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Не вдалося отримати статті' })
    }
}