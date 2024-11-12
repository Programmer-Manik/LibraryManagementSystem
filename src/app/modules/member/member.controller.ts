import { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { memberService } from "./member.service";
import sendResponse from "../../../utils/sendResponse";

const createMember: RequestHandler = catchAsync(async (req, res) => {
  const result = await memberService.createMember(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers: RequestHandler = catchAsync(async (req, res) => {
  const result = await memberService.getAllMembers();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberById: RequestHandler = catchAsync(async (req, res) => {
  const result = await memberService.getMemberById(req.params.memberId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember: RequestHandler = catchAsync(async (req, res) => {
  const result = await memberService.updateMember(
    req.params.memberId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember: RequestHandler = catchAsync(async (req, res) => {
  const result = await memberService.deleteMember(req.params.memberId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Member successfully deleted",
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
