import { Request } from "express";

const sendMessage = async (req: Request) => {
  const { content } = req.body;

  console.log(content);
};

export const chatService = {
  sendMessage,
};
