export interface Currency {
    id: number
    currencyCode: string
    currencyName: string
    active: boolean
    currencyValue: number
    setup: Setup
    createdBy: string
    modifiedBy: string
  }
  
  export interface Setup {
    id?: number
  }