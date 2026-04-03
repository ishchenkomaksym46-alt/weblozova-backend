import { pool } from "../../db/db.js";

export const getArticleByIdController = async (req, res) => {
    const { id } = req.query;

    try {
        const article = await pool.query("SELECT * FROM articles WHERE id = $1 LIMIT 1", [id]);

        if (article.rows.length === 0) {
            return res.json({ success: false, message: "Статтю не знайдено." });
        }

        return res.json({ success: true, data: article.rows[0] });
    } catch (error) {
        return res.json({ success: false, message: "Серверна помилка. Спробуйте ще." });
    }
};
