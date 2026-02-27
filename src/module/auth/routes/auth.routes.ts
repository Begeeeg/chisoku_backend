import express from "express";
import {
    loginController,
    logoutController,
    signupController,
} from "../controller/auth.controller";

const routes = express.Router();

routes.post("/signup", signupController);
routes.post("/login", loginController);
routes.post("/logout", logoutController);

export default routes;
