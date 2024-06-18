import { z } from "zod";

// Define the Zod schema for UserName
const userNameZodSchema = z.object({
    firstName: z.string()
        .max(20, { message: 'First name cannot be more than 20 characters' })
        .min(1, { message: 'First name is required.' })
        .regex(/^[A-Z][a-z]*$/, { message: '{VALUE} is not in capitalize format' }),
    middleName: z.string().min(1, { message: 'Middle name is required.' }),
    lastName: z.string()
        .min(1, { message: 'Last name is required.' })
        .regex(/^[A-Za-z]+$/, { message: '{VALUE} is not in alpha format' })
});

// Define the Zod schema for Guardian
const guardianZodSchema = z.object({
    fatherName: z.string().min(1, { message: 'Father\'s name is required.' }),
    fatherOccupation: z.string().min(1, { message: 'Father\'s occupation is required.' }),
    fatherContactNo: z.string().min(1, { message: 'Father\'s contact number is required.' }),
    motherName: z.string().min(1, { message: 'Mother\'s name is required.' }),
    motherOccupation: z.string().min(1, { message: 'Mother\'s occupation is required.' }),
    motherContactNo: z.string().min(1, { message: 'Mother\'s contact number is required.' })
});

// Define the Zod schema for LocalGuardian
const localGuardianZodSchema = z.object({
    name: z.string().min(1, { message: 'Local guardian\'s name is required.' }),
    occupation: z.string().min(1, { message: 'Local guardian\'s occupation is required.' }),
    contactNo: z.string().min(1, { message: 'Local guardian\'s contact number is required.' }),
    address: z.string().min(1, { message: 'Local guardian\'s address is required.' })
});

// Define the Zod schema for Student
const createValidationSchema = z.object({
    body: z.object({

        password: z.string().min(6, { message: 'Password is required.' }),
        student: z.object({
            name: userNameZodSchema,
            gender: z.enum(['male', 'female'], { message: '{VALUE} is not a valid gender.' }),
            dateOfBirth: z.date().optional(),
            email: z.string()
                .email({ message: '{VALUE} is not a valid email.' })
                .min(1, { message: 'Email is required.' }),
            contactNumber: z.string().min(1, { message: 'Contact number is required.' }),
            emergencyNumber: z.string().min(1, { message: 'Emergency contact number is required.' }),
            presentAddress: z.string().min(1, { message: 'Present address is required.' }),
            permanentAddress: z.string().min(1, { message: 'Permanent address is required.' }),
            bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
                .optional()
                .refine(value => value === undefined || ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].includes(value), {
                    message: '{VALUE} is not a valid blood group.'
                }),
            guardian: guardianZodSchema,
            localGuardian: localGuardianZodSchema,
            profileImage: z.string().optional(),

        })

    })
})

export const studentValidations = { createValidationSchema, }