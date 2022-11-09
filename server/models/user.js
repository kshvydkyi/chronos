import db from '../db/db.js';

class User {
    async select_all() {
        try {
            var sql = "SELECT * FROM `user`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM user WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async create(id) {
        try {
            var sql = `SELECT * FROM user WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
}
export default new User();