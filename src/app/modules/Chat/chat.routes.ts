import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ChatController } from "./chat.controller";

const router = express.Router();

router.post("/send-message", ChatController.sendMessage);

export const ChatRoutes = {
  router,
};
