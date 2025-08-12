
export interface User {
    id: number;
    email: string;
    password: string;
    status: number;
}

export interface CreateModelUser{
    email: string;
    password: string;
    status: number;
}