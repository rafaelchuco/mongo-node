import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.get("/new", postController.getCreateForm);
router.post("/", postController.create);
router.get("/edit/:id", postController.getEditForm);
router.post("/edit/:id", postController.update);
router.post("/delete/:id", postController.delete);

export default router;