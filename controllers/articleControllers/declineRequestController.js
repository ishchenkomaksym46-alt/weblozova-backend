import { pool } from "../../db/db.js";

export const declineRequestController = async (req, res) => {
    const { id } = req.query;

    try {
        await pool.query("UPDATE articles SET status = 'declined' WHERE id = $1", [id]);
        return res.json({ success: true });
    } catch (error) {
        return res.json({ success: false, message: 'Помилка серверу. Спробуйте ще.' });
    }
};
