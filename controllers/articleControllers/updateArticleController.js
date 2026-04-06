import { pool } from "../../db/db.js";

export const updateArticleController = async (req, res) => {
    const { id, topic, period, description, sources, contacts, image } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID статті обов\'язковий' });
    }

    try {
        const result = await pool.query(
            'UPDATE articles SET topic = $1, period = $2, description = $3, sources = $4, contacts = $5, image = $6 WHERE id = $7 RETURNING *',
            [topic, period, description, sources, contacts, image, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Статтю не знайдено' });
        }

        return res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Update article error:', error);
        return res.status(500).json({ success: false, message: 'Помилка серверу. Спробуйте ще.' });
    }
};
