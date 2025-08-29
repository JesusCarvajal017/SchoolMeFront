export interface UserRol{
    id: number;
    userId: number;
    userName: string;
    rolId: number;
    RolName: string;
    status: number;
}
export interface CreateModelUserRol{
    userName: string;
    rolName: string;
    status: number;
}