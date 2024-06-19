
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
    //semester name --> semester code
    console.log(payLoad);




    if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
        throw new Error("Invalid semester name or code");
    }
    const result = await AcademicSemesterModel.create(payLoad);
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}