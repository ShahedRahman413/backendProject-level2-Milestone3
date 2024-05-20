import { Schema, model, } from 'mongoose';


import { Student, UserName, Guardian, LocalGuardian } from './student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String, required: true
    },
    middleName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    }
})
const guardianSchema = new Schema<Guardian>(
    {
        fatherName: {
            type: String, required: true
        },
        fatherOccupation: {
            type: String, required: true
        },
        fatherContactNo: {
            type: String, required: true
        },
        motherName: {
            type: String, required: true
        },
        motherOccupation: {
            type: String, required: true
        },
        motherContactNo: {
            type: String, required: true
        }

    }
)

const localGuardianSchema = new Schema<LocalGuardian>(
    {
        name: {
            type: String, required: true
        },
        occupation: {
            type: String, required: true
        },
        contactNo: {
            type: String, required: true
        },
        address: {
            type: String, required: true
        }
    }
)

const studentSchema = new Schema<Student>({
    id: { type: String, required: true },
    name: userNameSchema,
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String, required: true
    },
    contactNumber: {
        type: String, required: true
    },
    emergencyNumber: {
        type: String, required: true
    },
    presentAddress: {
        type: String, required: true
    },
    permanentAddress: {
        type: String, required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],

    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: {
        type: String
    },
    isActive: {
        type: String,
        enum: ["active", "inactive"],

    }
})


export const StudentModel = model<Student>(
    "Student", studentSchema
)