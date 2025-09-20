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
  personId: number;
  rhId: number;
  adress: string;
  brithDate: string;      // si es fecha real, conviene Date
  stratumStatus: number;
  materialStatusId: number;
  epsId: number;
  munisipalityId: number;
}

 // { 
    //   "id": 0,
    //   "status": 0,
    //   "personId": 0,
    //   "rhId": 0,
    //   "adress": "string",
    //   "brithDate": "string",
    //   "stratumStatus": 0,
    //   "materialStatusId": 0,
    //   "epsId": 0,
    //   "munisipalityId": 0
    // }