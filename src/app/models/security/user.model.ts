
export interface User {
    id: number;
    email: string;
    password: string;
    photo: string;
    status: number;
    personId: number,
}

export interface CreateModelUser{
    email: string;
    password: string;
    status: number;   
}

export interface CreateModolUser2{
    photo?: File,
    email: string;
    password: string;
    personId: number,
    status: number; 
}