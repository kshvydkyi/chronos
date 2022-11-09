import status from '../settings/response.js'
import User from '../models/user.js';


const getRoles = async (req, res) => {
    try{
        const roles = await User.getRoles();
        console.log(roles);
    }
    catch(e){
        console.log(e);
    }

}


 export default getRoles;