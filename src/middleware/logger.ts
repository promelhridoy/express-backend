import type { NextFunction, Request, Response } from "express";
import  fs from "fs";

const logger = async (
    req: Request, res: Response, next:NextFunction ) => {
        //   console.log('Method-> Url -> Time:', req.method, req.url ,Date.now());
 
 const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${Date.now()}\n`;

fs.appendFile("logger.txt", log, (err : any) => {
    console.log(err);
})
  next();
}

export default logger;