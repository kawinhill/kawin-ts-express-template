import Enviroments from "../providers/Enviroments";
import HTTP_STATUS from "../libs/HTTPStatus";


export default class Development {
    public static async authenticate(req: any, res: any, next: any) {
        if (Enviroments.get().NODE_ENV == "development") {
            return next();
        }
        return res.status(HTTP_STATUS.UNAUTHORIZED).send(HTTP_STATUS.FORBIDDEN);
    }
}