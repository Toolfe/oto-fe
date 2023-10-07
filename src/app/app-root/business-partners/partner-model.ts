export interface Partner {
    datavalues: Datavalue[]
    name: string
    categoryId: number
    createdBy: string
    modifiedBy: string
    active: boolean
    setup: Setup
    element:any
  }
  
  export interface Datavalue {
    name: string
    value: string
    element:any

  }
  
  export interface Setup {
    orgId: string
    element:any

  }


  export interface BrandDetails{
    id?:Number;
    method?:String;
    name:String;
    code:String;
    active:Boolean;
    setup?: any;
    description:String;
    createdBy?:any;
    modifiedBy?:any;
    createdOn?:any;
    modifiedOn?:any;
    element:any

  }