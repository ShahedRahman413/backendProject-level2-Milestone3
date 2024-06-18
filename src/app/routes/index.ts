import { Router } from "express";
import { StudentRoute } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/students',
        route: StudentRoute
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/users',
        route: UserRoutes
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router