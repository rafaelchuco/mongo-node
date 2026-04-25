import { Router } from "express";
import webController from "../controllers/webController.js";

const router = Router();

router.get("/", (req, res) => webController.home(req, res));

export default router;