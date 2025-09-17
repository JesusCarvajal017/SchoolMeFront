export interface ModuleForm {
    id: number;
    moduleId: number;
    formId: number;
    moduleName?: string;
    formName?: string;  
    status: number;
}
export interface CreateModelModuleForm {
    moduleName: string;
    formName: string;
    status: number;
}