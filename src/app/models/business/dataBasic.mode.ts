export interface DataBasic {
  id: number;
  status: number;
  personId: number;
  rhId: number;
  adress: string;
  brithDate: string;      // si es fecha real, conviene Date
  stratumStatus: number;
  materialStatusId: number;
  epsId: number;
  munisipalityId: number;
}

export interface CreateDataBasic {
  status: number;
  personId?: number;
  rhId: number;
  adress: string;
  brithDate: string;      // si es fecha real, conviene Date
  stratumStatus: number;
  materialStatusId: number;
  epsId: number;
  munisipalityId: number;
}
