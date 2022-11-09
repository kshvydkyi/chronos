import status from '../settings/response.js'
import Role from '../models/Role.js';

class RoleController {
    async select_all(req, res, next) {
        try{
            const result = await Role.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var user_id = req.params.role_id;
            const result = await Role.select_by_id(role_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
}

export default new RoleController();