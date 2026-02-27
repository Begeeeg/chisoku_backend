import { Types } from "mongoose";
import { IUser } from "../../module/user/interface/IUser.Interface";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
