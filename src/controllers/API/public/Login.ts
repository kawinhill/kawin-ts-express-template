import { verifyPassword } from "../../../libs/PasswordChecker";
import HTTP_STATUS from "../../../libs/HTTPStatus";
import API_ERROR from "../../../libs/API_ERROR";
import User from "../../../services/User";

export default class Login {
    public static async post(req: any, res: any, next: any) {
        const { username, password } = req.body;
        // Fetch user from database
        const user = await User.getByUsername(username);
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.INVALID_CREDENTIALS);
        }
        // Verify password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send(API_ERROR.INVALID_CREDENTIALS);
        }
        // Generate token
        const token = (await User.generateToken(user)).token;
        console.log(token);
        // Return token
        return res.status(HTTP_STATUS.OK).send({ token });1
    }
    
}