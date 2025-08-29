export interface Permission {
    id: number;
    name: string;
    description: string;
    status: number;
}

export interface CreateModelPermission{
    name: string;
    description: string;
    status: number;
}