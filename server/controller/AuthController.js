import status from '../settings/response.js'
import Auth from '../models/Auth.js';

class AuthController {
    async register(req, res, next) {
        try{
            const result = await Auth.register(req.body);

            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async login(req, res, next) {
        try{
            const result = await Auth.login(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async logout(req, res, next) {
        try{
            const result = await Auth.logout();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
}

export default new AuthController();