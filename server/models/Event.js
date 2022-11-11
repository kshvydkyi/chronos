import db from '../db/db.js';

class Event {
    async select_all() {
        try {
            var sql = "SELECT * FROM `events`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM events WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async create(body) {
        try {
            // var sql = `INSERT INTO events (title) VALUES (${body.title}`;
            // const [row] = await db.execute(sql);
            // const jsonContent = JSON.stringify(row);
            // return jsonContent;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id)
	{
        try {
			var sql = `DELETE FROM events WHERE id = ${id}`;
			const [row] = await dbConnection.execute(sql);
            const jsonContent = JSON.stringify(row);
            return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}
}
export default new Event();