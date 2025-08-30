import { Router } from "express";
import { AddLinks, DeleteAccount, DeleteLink, GetLinkInformation, GetLinks, GetName, LogIn, LogOut, Register, UpdateLink, UpdatePassword, } from "../controllers/controllers.ts";
import { validateData } from "../middleware/validate.ts";
import { LinkSchema, RegisterSchema, SearchSchema, SingInSchema } from "../schema/schema.ts";
import { Verify } from "../middleware/verify.ts";
import { loginLimiter } from "../middleware/rateLimit.ts";

const router = Router();


//Register route
router.post('/api/signup', validateData(RegisterSchema), Register)

//Register route
router.post('/signup', validateData(RegisterSchema), Register)

//Login route
router.post('/signin', loginLimiter, validateData(SingInSchema), LogIn)

//Logout route
router.get('/logout', LogOut)

//Get links
router.get('/links', Verify, GetLinks)

//Add link
router.post('/links', Verify, validateData(LinkSchema), AddLinks)

//Delete link
router.delete('/link/:id', Verify, DeleteLink)

//Update link
router.patch('/link/:id', Verify, validateData(LinkSchema), UpdateLink)

//Delete link
router.delete('/link/:id', Verify, DeleteLink)

//Delete account
router.delete('/delete/acc', Verify, DeleteAccount)

//Update password
router.patch('/update/password', Verify, validateData(LinkSchema), UpdatePassword)

//Post search
router.post('/search/:url', validateData(SearchSchema), GetLinkInformation)

//Get name
router.get('/name',Verify, GetName)



export default router;