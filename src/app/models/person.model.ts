export interface Person{
    id: number;
    name: string;
    nameComplet: string;
    lastName: string;
    email: string;
    identification: string;
    age: number;
    status: number;
}

export interface CreateModelPerson{
    name: string;
    nameComplet?: string;
    lastName: string;
    email: string;
    identification: string;
    age: number;
    status: number;
}