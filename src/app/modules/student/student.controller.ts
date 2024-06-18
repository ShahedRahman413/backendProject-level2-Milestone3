import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";




const getAllStudents = catchAsync(async (req, res) => {

    const result = await StudentServices.getAllStudentsFromDb()


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Students are retrieved successfully",
        data: result

    })
}

)

const getSingleStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentsFromDb(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is retrieved successfully",
        data: result

    })
})


const deleteSingleStudent = catchAsync(async (req, res) => {

    const { studentId } = req.params
    const result = await StudentServices.deleteSingleStudentsFromDb(studentId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student is deleted successfully",
        data: result

    })

})


export const StudentControllers = { getAllStudents, getSingleStudent, deleteSingleStudent }