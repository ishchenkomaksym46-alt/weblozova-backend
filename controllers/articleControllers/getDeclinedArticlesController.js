import { pool } from "../../db/db.js";

export const getDeclinedArticlesController = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles WHERE status = \'declined\'');

        return res.json({ success: true, data: result.rows })
    } catch (error) {
        return res.json({ success: false });
    }
}