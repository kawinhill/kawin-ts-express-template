import * as express from "express";
import Login from "../../controllers/API/public/Login";
import Register from "../../controllers/API/public/Register";

const router = express.Router();

router.post('/login', Login.post);
router.post('/register', Register.post);




export default router;
