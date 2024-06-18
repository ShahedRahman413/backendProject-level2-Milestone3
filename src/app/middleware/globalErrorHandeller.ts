import express, { Application, NextFunction, Request, Response } from "express";

export const globallErrorHandelar = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500
    const message = err.message || 'Something went wrong'
    return res.status(statusCode).json({
        success: false,
        message: message,
        error: err
    })
}