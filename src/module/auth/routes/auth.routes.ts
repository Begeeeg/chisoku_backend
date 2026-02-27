import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller";

const routes = express.Router();

routes.post("/signup", signUp);
routes.post("/signin", signIn);
routes.post("/signout", signOut);

export default routes;
