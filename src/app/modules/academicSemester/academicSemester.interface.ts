export type TMonths = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export type TAcademicsSemesterName = 'Autumn' | 'Summer' | 'Fall'

export type TAcademicsSemesterCode = '01' | '02' | '03'

export type TAcademicSemesterNameCodeMapper = {
    [key: string]: string
}
export type TAcademicSemester = {
    name: TAcademicsSemesterName,
    code: TAcademicsSemesterCode,
    year: String,
    startMonth: TMonths,
    endMonth: TMonths

}
