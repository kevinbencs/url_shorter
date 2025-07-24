import { Router } from "express";
import { AddLinks, AddPrivateLinks, DeleteAccount, DeleteLink, GetLinkInformation, GetLinks, GetPrivateLinks, LogIn, LogOut, Register, UpdateLink, UpdatePassword, } from "../controllers/controllers.ts";
import { validateData } from "../middleware/validate.ts";
import { LinkSchema, RegisterSchema, SearchSchema, SingInSchema } from "../schema/schema.ts";
import { Verify } from "../middleware/verify.ts";


const router = Router();


//Register route
router.post('/api/signup', validateData(RegisterSchema), Register)

//Login route
router.post('/api/signin', validateData(SingInSchema), LogIn)

//Logout route
router.get('/api/logout', LogOut)

//Get links
router.get('/api/links', Verify, GetLinks)

//Add link
router.post('/api/links', Verify, validateData(LinkSchema), AddLinks)

//Delete link
router.delete('/api/link/:id', Verify, DeleteLink)

//Update link
router.patch('/api/link/:id', Verify, validateData(LinkSchema), UpdateLink)

//Delete link
router.delete('/api/link/:id', Verify, DeleteLink)

//Update link
router.patch('/api/link/:id', Verify, validateData(LinkSchema), UpdateLink)

//Delete account
router.delete('/api/delete/acc', Verify, DeleteAccount)

//Add private link
router.post('/api/link/private', Verify, AddPrivateLinks)

//Get private link
router.get('/api/link/private', Verify, GetPrivateLinks);


//Update password
router.patch('/api/update/password', Verify, validateData(LinkSchema), UpdatePassword)

//Post search
router.post('/api/search/:url', validateData(SearchSchema), GetLinkInformation)



export default router;