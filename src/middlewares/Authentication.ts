import User from "../services/User";
import HTTP_STATUS from "../libs/HTTPStatus";
import API_ERROR from "../libs/API_ERROR";


export default class Authentication {
    public static async authenticate(req: any, res: any, next: any) {
        let token = req.headers.authorization;
        // check if first 7 characters are 'Bearer ' (IF NOT THEN RETURN UNAUTHORIZED)
        if (!token || token.length < 7 || token.substring(0, 7) !== 'Bearer ') {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.UNAUTHORIZED);
        }
        token = token.replace('Bearer ', ''); 
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
