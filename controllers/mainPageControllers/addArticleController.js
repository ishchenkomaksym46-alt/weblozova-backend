import { pool } from "../../db/db.js";

export const addArticleController = async (req, res) => {
    const { topic, period, description, sources, contacts, image } = req.body;

    try {
        await pool.query(
            'INSERT INTO articles (user_id, topic, period, description, sources, contacts, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [req.user.id, topic, period, description, sources, contacts, image]
        );
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false });
    }
}