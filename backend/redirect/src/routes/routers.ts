import {Router} from "express";
import { UrlRedirect } from "../controllers/controllers.ts";

const router = Router();

//Redirect url
router.get('/:url',UrlRedirect)

export default router;