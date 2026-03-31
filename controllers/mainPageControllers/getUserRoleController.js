import { pool } from "../../db/db.js";

export const getUserRoleController = async (req, res) => {
    try {
        const userRole = await pool.query('SELECT role FROM users WHERE id = $1', [req.user.id]);

        if(userRole.rows.length === 0) {
            return res.status(401).json({ success: false })
        }

        if(userRole.rows[0].role === 'admin') {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}