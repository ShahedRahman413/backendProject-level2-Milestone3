import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TStudent, TUserName, TGuardian, TLocalGuardian, StudentModel } from './student.interface';



const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        trim: true,
        maxlength: [20, 'firstName can not be more than 20 characters'],
        required: [true, 'First name is required.'],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return firstNameStr === value
                // return firstNameStr.match(/^[A-Z][a-z]+$/)

            },
            message: '{VALUE} is not in capitalize formate'
        }
    },
    middleName: {
        type: String,
        required: [true, 'Middle name is required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not in alpha formate'
        }
    }
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s name is required.']
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s occupation is required.']
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s contact number is required.']
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s name is required.']
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s occupation is required.']
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s contact number is required.']
    }
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian\'s name is required.']
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian\'s occupation is required.']
    },
    contactNo: {
        type: String,
        required: [true, 'Local guardian\'s contact number is required.']
    },
    address: {
        type: String,
        required: [true, 'Local guardian\'s address is required.']
    }
});


const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        unique: true,
        required: [true, 'Student ID is required.']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: 'User'
    }
    ,
    name: {
        type: userNameSchema,
        required: [true, 'Student\'s name is required.']
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: '{VALUE} is not a valid gender.'
        },
        required: [true, 'Gender is required.']
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        validate: {
            validator: (email: string) => validator.isEmail(email),
            message: '{VALUE} is not a valid email.'
        }
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number is required.']
    },
    emergencyNumber: {
        type: String,
        required: [true, 'Emergency contact number is required.']
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required.']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required.']
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
            message: '{VALUE} is not a valid blood group.'
        }
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required.']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required.']
    },
    profileImage: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    toJSON: {
        virtuals: true
    }
});
///virtual 
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName;
})


//pre save middleware /hook

//query middleware
studentSchema.pre('find', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } })
    next()


})
studentSchema.pre('findOne', function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } })
    next()


})

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

    next()


})



///creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    return existingUser
}





export const Student = model<TStudent, StudentModel>("Student", studentSchema);


