export interface Roles {
    id:number;
    name: string
    profiles: AssignProfile[]
    createdBy: string
    modifiedBy: string
    setup: Setup
    active: boolean
    divisions: Division[]
    locations: Location[]
    units: Unit[]
    departments: Department[]
  }
  
  export interface AssignProfile {
    id: number
    profileName:string;
  }
  
  export interface Setup {
    id: string
  }
  
  export interface Division {
    id: number
  }
  
  export interface Location {
    id: number
  }
  
  export interface Unit {
    id: number
  }
  
  export interface Department {
    id: number
  }
  