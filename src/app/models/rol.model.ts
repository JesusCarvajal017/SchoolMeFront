export interface Rol{
    id: number;
    name: string;
    description: string;
    status: number;
}
export interface CreateModelRol{
    name: string;
    description: string;
    status: number;
}