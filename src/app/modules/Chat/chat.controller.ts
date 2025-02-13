import { Request, Response } from "express";
import httpStatus from "http-status";
import { string } from "zod";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { chatService } from "./chat.service";

const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const chat = chatService.sendMessage(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Message send success",
    data: chat,
  });
});

export const ChatController = {
  sendMessage,
};
