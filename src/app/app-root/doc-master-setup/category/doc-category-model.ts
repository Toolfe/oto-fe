export interface DocCategory {
    code: any
    name: string
    divisionId: number
    unitId: number
    departmentId: number
    active: boolean
    createdBy: string
    modifiedBy: string
    setup: Setup
  }
  
  export interface Division {
    id: number,
    name:string,
  }
  
  export interface Unit {
    id: number,
    name:string,
  }
  
  export interface Department {
    id: number,
    name:string,
  }
  
  export interface Setup {
    id: string
  }