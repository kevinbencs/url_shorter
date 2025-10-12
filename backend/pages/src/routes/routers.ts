import {Router} from "express";
import { GetDashboardPage, GetHomePage,  GetNoRoute,  GetSearchPage, GetSigUpPage, GetSignInPage, NoRoute } from "../controllers/controllers.ts";
import { authenticateToken } from "../middleware/authDashboard.ts";
import { redDash } from "../middleware/redirectDashboard.ts";


const router = Router();


//Get Home page
router.get('/', redDash,GetHomePage)

//Get Sign in page
router.get('/signin',redDash,GetSignInPage)

//Get Sign up page
router.get('/signup',redDash,GetSigUpPage)


//Get Sign up page
router.get(/^\/dashboard(\/.*)?$/,authenticateToken,GetDashboardPage)


//Get Search page
router.get('/search',GetSearchPage)

//Get 404
router.get(/.*/,GetNoRoute)

//404 route
router.use(NoRoute)




export default router;