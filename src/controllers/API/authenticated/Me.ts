import User from "../../../services/User";
import HTTP_STATUS from "../../../libs/HTTPStatus";
import API_ERROR from "../../../libs/API_ERROR";


export default class Me {
    public static async get(req: any, res: any, next: any) {
        const user = req.user;
        console.log(user);
        const userDetail = await User.getUserDetails(user.uuid);
        console.log(userDetail);
        return res.status(HTTP_STATUS.OK).send(userDetail);
    }
}