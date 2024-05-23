import { Router } from "express";
import passport from "passport";
import { auth, isAdmin } from "../utils/auth.js";

const indexRouter = Router();

import {
  getIndexPage,
  getLoginPage,
  getSigninPage,
  getLoginFail,
  getSigninFail,
  getLogout,
  getLogger,
  clearLog,
  msgPage,
} from "../controllers/indexController.js";

indexRouter.get("/", getIndexPage);
indexRouter.get("/login", getLoginPage);
indexRouter.get("/signin", getSigninPage);
indexRouter.get("/loginfail", getLoginFail);
indexRouter.get("/signinfail", getSigninFail);
indexRouter.get("/logout", getLogout);
indexRouter.get("/logger", auth, isAdmin, getLogger);
indexRouter.get("/clearlogs", auth, isAdmin, clearLog);
indexRouter.get("/msgpage", auth, msgPage);

indexRouter.post(
  "/loginreq",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/loginfail",
  }),
  getIndexPage
);
indexRouter.post(
  "/signinreq",
  passport.authenticate("signin", {
    successRedirect: "/",
    failureRedirect: "/signinfail",
  }),
  msgPage
);

export default indexRouter;
