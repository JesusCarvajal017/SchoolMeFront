export interface Municipality {
  id: number;
  status: number;
  departamentId: number;
  name: string;
}

export interface CreateMunicipality {
  id: number,
  status: number;
  
  departamentId: number;
  name: string;
}
