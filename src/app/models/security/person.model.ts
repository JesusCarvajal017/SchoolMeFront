export interface Person{
    id: number;
    documentTypeId: number;
    identification: string;
    fisrtName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    phone: string;
    gender: number;
    acronymDocument: string;
    // age: number;
    status: number;

 
}

export interface CreateModelPerson{
    id? : number;
    identification: string;
    fisrtName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    documentTypeId: number;
    phone: string;
    gender: string;
    // age: number;
    status: number;
}