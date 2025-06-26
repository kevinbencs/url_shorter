import {Router} from "express";
import { GetDashboardPage, GetHomePage,  GetSearchPage, GetSigUpPage, GetSignInPage } from "../controllers/controllers.ts";
import { authenticateToken } from "../middleware/authDashboard.ts";


const router = Router();

router.use(authenticateToken)

//Get Home page
router.get('/', GetHomePage)

//Get Sign in page
router.get('/signin',GetSignInPage)

//Get Sign up page
router.get('/signup',GetSigUpPage)

//Get Dashboard page
router.get('/dashboard',GetDashboardPage)

//Get Search page
router.get('/search',GetSearchPage)




export default router;