export interface AcademicLoad {
    id: number;
    teacherId: number;
    teacherName: string;
    subjectId: number;
    subjectName: string;
    groupId: number;
    nameGroup: string;
    day: string;
    status: number;
}
export interface CreateModelAcademicLoad{
    id: number;
    teacherId: number;
    teacherName: string;
    subjectId: number;
    subjectName: string;
    groupId: number;
    groupName: string;
    day: string;
    status: number;
}