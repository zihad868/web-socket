import { Request } from "express";
import prisma from "../../../shared/prisma";

const sendMessage = async (req: Request) => {
  const { content } = req.body;

  console.log("content", content);

  const message = await prisma.message.create({
    ...content,
  });

  return message;
};

export const chatService = {
  sendMessage,
};
