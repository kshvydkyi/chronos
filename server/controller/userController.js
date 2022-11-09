import status from '../settings/response.js'
import User from '../models/User.js';

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
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

}
 export default new UserController();