
import db from '../db/db.js';
import User from '../models/User.js';

class Auth {
    async register(body) {
        try {
            data = {
                    "login": body.login,
                    "password": body.password,
                    "confirm_password": body.password,
                    "full_name": body.full_name,
                    "about_me": "",
                    "photo": "default_avatar.png",
                    "email": body.email,
                    "role_id": 1,
                };
        } catch (err) {
            console.log(err);
        }
    }

    async login(body) {
        try {

        } catch (err) {
            console.log(err);
        }
    }
    async logout() {
        try {

        } catch (err) {
            console.log(err);
        }
    }
}
export default new Auth();