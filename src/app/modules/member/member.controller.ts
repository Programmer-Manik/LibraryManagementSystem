import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { MemberService } from "./member.service";
import sendResponse from "../../../shared/sendResponse";


const getAllMemberFromDB: RequestHandler = catchAsync(async(req, res)=>{

    const result = await MemberService.getAllMember();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Members retrieved successfully",
        data: result,
      });
})

const createMemberToDB: RequestHandler = catchAsync(async(req, res)=>{
    const result = await MemberService.createMember(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Member created successfully",
        data: result,
      });
})

const getSingleMemberFromDB: RequestHandler = catchAsync(async(req, res)=>{
    const result = await MemberService.getSingleMember(req.params.memberId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Member retrieved successfully",
        data: result,
      });
})

const updateMemberFromDB: RequestHandler = catchAsync(async(req, res)=>{
    const result = await MemberService.updateMember(req.params.memberId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Member updated successfully",
        data: result,
      });
})


const deleteMemberFromBD: RequestHandler = catchAsync(async(req, res)=>{
    const result = await MemberService.deleteMember(req.params.memberId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Member successfully deleted",
        data: null,
      });
})


export const MemberController = {
    getAllMemberFromDB,
    createMemberToDB,
    getSingleMemberFromDB,
    updateMemberFromDB,
    deleteMemberFromBD
}