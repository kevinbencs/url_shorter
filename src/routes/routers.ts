import {Router} from "express";

const router = Router();

//Get Home page
router.get('/')

//Get Sign in page
router.get('/signin')

//Get Sign up page
router.get('/signup')

//Get Dashboard page
router.get('/dashboard')

//Register route
router.post('/signup')

//Login route
router.post('/signin')