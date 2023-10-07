export interface BusinessCategory {
    id?: number
    name: string
    description: string
    fields: Field[]
    setup: Setup
    createdBy: string
    modifiedBy: string
    active: boolean
  }
  
  export interface Field {
    name: string
    type: string
    ref: string
    validators: Validators
  }
  
  export interface Validators {
    maxLength: string
    minLength: any
    required: boolean
  }
  
  export interface Setup {
    id: string
  }