import { hashPassword } from "../../../libs/PasswordChecker";
import HTTP_STATUS from "../../../libs/HTTPStatus";
import API_ERROR from "../../../libs/API_ERROR";
import User from "../../../services/User";

export default class Register {
    public static async post(req: any, res: any, next: any) {
        const { username, password } = req.body;
        // Check if user already exists
        const user = await User.getByUsername(username);
        if (user) {
            return res.status(HTTP_STATUS.CONFLICT).send(API_ERROR.USERNAME_TAKEN);
        }
        // Hash password
        const hashedPassword = await hashPassword(password);
        // Create user
        await User.createUser(username, hashedPassword);
        // Return success
        return res.status(HTTP_STATUS.CREATED).send();
    }
}