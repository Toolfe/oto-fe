export interface Project {
  [x: string]: any;
  id: number;
    projectName: string
    projectCode: string
    projectOrderNo: number
    businessPartners: BusinessPartner
    brandContacts:BrandContacts[]
    group:Group
    setup: Setup
    createdBy: string
    modifiedBy: string
    active: boolean
  }
  
  export interface BusinessPartner {
    id: number
  }
  export interface BrandContacts {
    id: number
  }
  
  export interface Group {
    id: number
  }
 
  
  export interface Setup {
    id: string
  }