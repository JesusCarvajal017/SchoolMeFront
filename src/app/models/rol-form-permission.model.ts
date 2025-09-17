export interface RolFormPermission {
    id: number;
    rolId: number;
    FormId: number;
    PermissionId: number;
    rolName?: string;
    formName?: string;
    permissionName?: string;  
    status: number;
}
export interface CreateModelRolFormPermission {
    rolId: number;
    moduleFormId: number;
    status: number;
}