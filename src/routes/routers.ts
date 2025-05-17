import {Router} from "express";
import { GetDashboardPage, GetHomePage, GetSearchPage, GetSigUpPage, GetSignInPage, Register } from "../controllers/controllers";
import { validateData } from "../middleware/validate";
import { RegisterSchema } from "../schema/schema";

const router = Router();

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

//Register route
router.post('/api/signup', validateData(RegisterSchema), Register)

//Login route
//router.post('/api/signin')

//Logout route
//router.get('/api/logout')

//Get links
//router.get('/api/links')

//Add link
//router.post('/api/links')

//Get link information
//router.get('/api/search/:link')

//Delete link
//router.delete('/api/link/:id')

//Update link
//router.patch('/api/link/:id')

//Redirect url
//router.get('/:url')

export default router;