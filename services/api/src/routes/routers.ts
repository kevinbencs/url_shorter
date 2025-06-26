import {Router} from "express";
import { AddLinks, AddPrivateLinks, DeleteAccount, DeleteLink,  GetLinkInformation, GetLinks,  GetPrivateLinks,  LogIn, LogOut, Register, UpdateLink, UpdatePassword, } from "../controllers/controllers.ts";
import { validateData } from "../middleware/validate.ts";
import { LinkSchema, RegisterSchema, SearchSchema, SingInSchema } from "../schema/schema.ts";
import { authenticateToken } from "../middleware/authDashboard.ts";


const router = Router();

router.use(authenticateToken)

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

//Delete link
router.delete('/api/link/:id',DeleteLink)

//Update link
router.patch('/api/link/:id',validateData(LinkSchema) ,UpdateLink)

//Delete account
router.delete('/api/delete/acc',DeleteAccount)

//Add private link
router.post('/api/link/private',AddPrivateLinks)

//Get private link
router.get('/api/link/private', GetPrivateLinks);


//Update password
router.patch('/api/update/password',validateData(LinkSchema) ,UpdatePassword)

//Post search
router.post('/api/search/:url', validateData(SearchSchema),GetLinkInformation)



export default router;