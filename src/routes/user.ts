import express, { Request, Response } from "express";
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth';

export const router = express.Router();

router.post("/", userController.create);

router.get("/", userController.getAll);

router.get("/profile", auth, userController.get);

router.get("/:id", userController.get);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);