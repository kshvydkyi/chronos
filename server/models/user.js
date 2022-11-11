import db from '../db/db.js';
import hash_password from '../utils/hash_password.js';

class User {
    async select_all() {
        try {
            var sql = "SELECT * FROM `user`";
            const [row] = await db.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM user WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (err) {
            console.log(err);
        }
    }

    async create(body) {
        try {
            const password = await hash_password(body.password);
            var sql = `INSERT INTO users
            (login, password, full_name, about_me, photo, email, role_id)
            VALUES
            (${body.login},
            ${password},
            ${body.full_name},
            ${body.about_me},
            ${body.photo},
            ${body.email},
            ${body.role_id})`;
            const [row] = await db.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id)
	{
        try {
			var sql = `DELETE FROM users WHERE id = ${id}`;
			const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}

    async update_avatar(path, user_id)
	{
        try {
			var sql = `UPDATE users SET photo = '${path}' WHERE id = ${user_id}`;
            const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}
}
export default new User();