import status from '../settings/response.js'
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

class UserController {
    async select_all(req, res, next) {
        try{
            const result = await User.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var user_id = req.params.user_id;
            const result = await User.select_by_id(user_id);
            // console.log(result);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async create(req, res, next) {
        try{
            req.body.password = await hash_password(req.body.password);
            const result = await User.create(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try{
            var user_id = req.params.user_id;
            const result = await User.delete_by_id(user_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async update_avatar(req, res, next) { 
        const pathFile = req.file.filename;
        const token = req.params.token;  
        try {
            const userData = jwt.verify(token, "jwt-key");
            const result = await User.update_avatar(pathFile,  userData.userId);
            status(200, {result}, res);
        } catch (err) {
            next(err);
        }
    }
    async checkToken(req, res, next){
        const token = req.params.token;
        try{
            jwt.verify(token, 'jwt-key');
            status(200, {message:`token alive`}, res);
        }
        catch(err){
            console.log(err);
            status(401, {message:`token dead`}, res);
            next(err);
           
        }
    }
}
export default new UserController();