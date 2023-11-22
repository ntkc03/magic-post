import userAuthRouter from "./userAuth";
import { Application } from "express";
import userRouter from "./user";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

const routes = (app: Application) => {
    app.use('/api/user', userRouter());
    app.use('/api/user-auth', userAuthRouter());
}

export default routes;
    