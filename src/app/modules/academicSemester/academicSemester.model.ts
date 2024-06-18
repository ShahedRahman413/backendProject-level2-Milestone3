import mongoose, { Schema, Document, model } from 'mongoose';

import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';




const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true }
});

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemesterModel.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterExists) {
        throw new Error('Academic Semester already exists');
    }
    next();
})

const AcademicSemesterModel = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemesterModel;
