import status from '../settings/response.js'
import User from '../models/user.js';


const getRoles = async (req, res) => {
    try{
        const roles = await User.getRoles();
        console.log(roles);
        status(200, {roles}, res);
    }
    catch(e){
        status(505, {e}, res);
    }

}


 export default getRoles;