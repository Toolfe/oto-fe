export interface Setup {
    id: string;
}

export interface Grouping {
    id:number;
    group: any;
    category: any;
    type: any;
    workingGroup: any;
    designation: string;
}
export interface Department {
    id:any;
    
}
export interface SubDepartment{
    id:any;
  
    
}
export interface Designation{
    id:any;
    
}
export interface CustomRole {
    id:any;
    
}


export interface Specific {
    id:number;
    siblingsProf: any;
    parentsProf: any;
    familyprof: any;
    familyBusiness: any;
    nativePlace: any;
    ethinicOrigin: any;
    industry: any;
    closeRelationship: any;
    companyNames: any;
    businessContact: any;
}

export interface Skills {
    id:any;
    skillSet: any;
    industrySpecificSkill: any;
    language: any;
    previousCompany: any;
    workProcess: any;
    resource: any;
}

export interface Hierachy {
    id:number;
    functionReporting?: any;
    businessReporting?: any;
}

export interface Employee {
    id: any;
    empId: any;
    fname: any;
    lname: any;
    nationalId: any;
    mainAddress: any;
    currentAddress: any;
    joinDate: any;
    resignDate: any;
    department: any;
    subDepartment: any;
    designation: any;
    customRole:any;
    primaryEmail: any;
    secondaryEmail: string;
    password: string;
    primaryPhone: any;
    secondaryPhone: any;
    govermentId: any;
    remark1: any;
    remark2: any;
    photo?: any;
    role: string;
    setup: Setup;
    grouping: Grouping;
    specific: Specific;
    skills: Skills;
    previousCompany:any;
    hierachy: Hierachy;
    active: boolean;
    initialLogin: boolean;
    currentIndex: string;
    createdBy: string;
    modifiedBy: string;
    orgId: string;
}


