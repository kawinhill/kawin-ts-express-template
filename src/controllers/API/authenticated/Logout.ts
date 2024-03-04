import User from "../../../services/User";
import HTTP_STATUS from "../../../libs/HTTPStatus";
import API_ERROR from "../../../libs/API_ERROR";

export default class Logout {
    public static async post(req: any, res: any, next: any) {
        let token = req.headers.authorization;
        token = token.replace('Bearer ', '');
        // remove Bearer from token
        console.log(token);
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.INVALID_CREDENTIALS);
        }
        User.deleteToken(token);
        return res.status(HTTP_STATUS.OK).send();
    }
    
}