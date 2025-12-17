import {Router} from "express";
import { UrlRedirect, NoUrlRedirect } from "../controllers/controllers.ts";

const router = Router();

//Redirect url
router.get('/:url',UrlRedirect)

router.use(NoUrlRedirect)

export default router;