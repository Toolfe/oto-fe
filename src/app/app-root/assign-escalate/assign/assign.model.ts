export interface Assign {
  id: number;
  typeId: TypeId
  priority: string
  department: string
  count: number
  setup: Setup
  employees: any
  active: boolean
  createdBy: string
  modifiedBy: string
}

export interface Setup {
  id: string
}
export interface TypeId {
  id: number
}
export interface Employee {
  id: number
}