import {Router} from "express";
import { AddLinks, DeleteLink, GetDashboardPage, GetHomePage, GetLinkInformation, GetLinks, GetSearchPage, GetSigUpPage, GetSignInPage, LogIn, LogOut, Register, UpdateLink, UrlRedirect } from "../controllers/controllers.ts";
import { validateData } from "../middleware/validate.ts";
import { LinkSchema, RegisterSchema, SearchSchema, SingInSchema } from "../schema/schema.ts";

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
router.post('/api/signin', validateData(SingInSchema),LogIn)

//Logout route
router.get('/api/logout',LogOut)

//Get links
router.get('/api/links',GetLinks)

//Add link
router.post('/api/links',validateData(LinkSchema) ,AddLinks)

//Delete link
router.delete('/api/link/:id',DeleteLink)

//Update link
router.patch('/api/link/:id',validateData(LinkSchema) ,UpdateLink)

//Post search
router.post('/api/search/:url', validateData(SearchSchema),GetLinkInformation)

//Redirect url
router.get('/:url',UrlRedirect)

export default router;