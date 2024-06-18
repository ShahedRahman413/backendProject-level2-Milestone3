import { string } from "joi";
import { Model, Types } from "mongoose";
import { never } from "zod";

export interface TGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}
export interface TUserName {
    firstName: string;
    middleName: string,
    lastName: string
};
export interface TLocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string

}

export interface TStudent {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TUserName;
    gender: "male" | "female";
    dateOfBirth?: Date;
    email: string;
    contactNumber: string;
    emergencyNumber: string
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImage?: string;
    isDeleted: boolean
}



//for creating static

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}






//for creating instance
// export type StudentMethod = {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// export type ModelStudent = Model<TStudent, Record<string, never>, StudentMethod>