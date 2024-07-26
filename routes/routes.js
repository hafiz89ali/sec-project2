import { Router } from "express";
import healthController from "../controllers/health.js";
import authController from "../controllers/auth.js";
import privacyController from "../controllers/privacy.js";
import isAuth from "../middlewares/isAuth.js";
import createLink from "../controllers/links/create.js";
import listLinks from "../controllers/links/list.js";
import updateLink from "../controllers/links/update.js";
import deleteLink from "../controllers/links/delete.js";
import redirect from "../controllers/links/redirect.js";

const router = Router();

router.get("/health", healthController.getHealth);
router.post("/health", healthController.postHealth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/public", privacyController.publicPath);
router.get("/private", isAuth, privacyController.privatePath);

// link routes
router.post("/link", isAuth, createLink);
router.get("/links", isAuth, listLinks);
router.get("/link/:id", isAuth, listLinks);
router.put("/link/:id", isAuth, updateLink);
router.delete("/link/:id", isAuth, deleteLink);

// link redirect
router.get("/:name", redirect);

export default router;
