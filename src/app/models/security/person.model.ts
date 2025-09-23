import { TuiDay } from "@taiga-ui/cdk/date-time";
import { CreateDataBasic, DataBasic } from "../business/dataBasic.mode";


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
    identification?: number;
    fisrtName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    documentTypeId: number;
    phone: number;
    gender: number;
    // age: number;
    status: number;
}

export interface PersonComplete {
  status: number;
  documentTypeId: number;
  identification: number;
  fisrtName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  phone: number;
  gender: number;
  dataBasic: CreateDataBasic;
}

export type FormPersonValue = {
  status: boolean;
  documentTypeId: number | null;
  fisrtName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  identification: number | null;
  phone: number | null;
  gender: number | null;
  rhId: number | null;
  adress: string;
  brithDate: TuiDay | null;           // 👈 importante
  stratumStatus: boolean;
  materialStatusId: number | null;
  epsId: number | null;
  munisipalityId: number | null;
  departamentId: number | null;
};
