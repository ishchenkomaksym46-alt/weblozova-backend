import { pool } from "../../db/db.js";

export const getArticlesController = async (req, res) => {
    try {
        const articles = await pool.query("SELECT * FROM articles WHERE status = 'accepted'");

        return res.json({ success: true, data: articles.rows });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Не вдалося завантажити статті."
        });
    }
}
