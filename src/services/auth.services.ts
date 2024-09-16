import user from "../models/users.models";
import { IUser } from "../models/users.models";

export const authUser = async (userData: Partial<IUser>) : Promise<IUser | null> => {
    try{
        const userToValidate = await user.findOne({email: userData.email});
        if(userToValidate?.password == userData.password ){
            return userToValidate;
        }else{
            return null;
        }
    }catch(err){
        throw err;
    }
}
