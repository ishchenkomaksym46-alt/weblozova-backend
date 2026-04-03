import { pool } from "../../db/db.js";

export const getAcceptedArticles = async (req, res) => {
    try {
        const articles = await pool.query('SELECT * FROM articles WHERE status = \'accepted\'');
        
        return res.json({ success: true, data: articles.rows});
    } catch (error) {
        return res.json({ success: false });
    }
}
