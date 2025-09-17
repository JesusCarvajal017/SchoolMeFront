export interface UserRol{
    id: number;
    userId: number;
    nameUser: string;
    rolId: number;
    rolName: string;
    status: number;
}
export interface CreateModelUserRol{
    userId: number;
    rolId: number;
    nameUser: string;
    rolName: string;
    status: number;
}