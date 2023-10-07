export interface  Category {
    name: string
    description: string
    fields: Field[]
    setup: Setup
    createdBy: string
    modifiedBy: string
    active: boolean
  }
  
  export interface Field {
    id:number
    name: string
    type: string
    reference: string
    validators: Validators
  }
  
  export interface Validators {
    maxLength: number
    minLength: any
    required: boolean
  }
  
  export interface Setup {
    id: string
  }