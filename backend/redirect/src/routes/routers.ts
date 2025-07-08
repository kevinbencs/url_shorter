import {Router} from "express";
import { UrlRedirect } from "../controllers/controllers.ts";
import { validateData } from "../middleware/validate.ts";
import { authenticateToken } from "../middleware/authDashboard.ts";


const router = Router();

router.use(authenticateToken)


//Redirect url
router.get('/:url',UrlRedirect)

export default router;