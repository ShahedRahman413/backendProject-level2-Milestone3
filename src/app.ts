import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import { globallErrorHandelar } from "./app/middleware/globalErrorHandeller";
import NotFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();


app.use(express.json());
app.use(cors());
app.use('/api/v1', router)


const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send('Hello World!')
  res.send(a);
}
app.get("/", getAController);
app.use(globallErrorHandelar)
app.use(NotFound)


export default app;
