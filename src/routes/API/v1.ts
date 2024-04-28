import * as express from "express";
import Login from "../../controllers/API/public/Login";
import Register from "../../controllers/API/public/Register";
import Logout from "../../controllers/API/authenticated/Logout";
import Me from "../../controllers/API/authenticated/Me";
import Authentication from "../../middlewares/Authentication";

const router = express.Router();

router.post('/login', Login.post);
router.post('/register', Register.post);
router.post('/logout', Authentication.authenticate, Logout.post);
router.get('/me', Authentication.authenticate, Me.get);




export default router;
