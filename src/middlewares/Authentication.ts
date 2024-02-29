import User from "../services/User";
import HTTP_STATUS from "../libs/HTTPStatus";
import API_ERROR from "../libs/API_ERROR";


export default class Authentication {
    public static async authenticate(req: any, res: any, next: any) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.UNAUTHORIZED);
        }
        const user = await User.getByToken(token);
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.UNAUTHORIZED);
        }
        req.user = user;
        next();
    }
}
