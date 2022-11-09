import Model from './model.js';

class User extends Model {
    async getRoles() {
        const sql =  await this.DB.query("SELECT * FROM roles");
        return sql[0];
    }
}
export default new User;