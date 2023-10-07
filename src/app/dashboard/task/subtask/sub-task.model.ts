export interface SubTask {
  id: number;
  title: string
  description: string
  code: any
  customizedStatus:string,
  taskType: TaskType
  subDepartment: SubDepartment
  initDate: string
  initiator: Initiator
  initTime: string
  estimatedDate: any
  completedDate: string
  completedTime: string
  target: string
  actual: any
  comparisonFactor: any
  priorityFactor: string
  percentage: any
  weightage: any
  ratingCode: any
  status: number
  createdOn: any
  modifiedOn: any
  assignee: Assignee
  observers: Observer[]
  dependencies: Dependency[]
  typeFields:any;
  resultant: any
  parentId: number
  parentCategory: any
  project:any;
  subtaskRating: SubtaskRating
  task: Task
  active: boolean
  createdBy: CreatedBy
  modifiedBy: string
}

export interface SubDepartment {
  id: number
  code: string
  name: string
}

export interface TaskType {
  id: number 
}

export interface Initiator {
  id: number
  orgId: number
  empId: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}

export interface Assignee {
  id: number
  orgId: number
  empId: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}

export interface Observer {
  id: number
  orgId: number
  empId: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}

export interface Dependency {
  id: number
}

export interface SubtaskRating {
  scaleValue: any
  rating: any
  ratingValue: any
}

export interface Task {
  id: number
}

export interface CreatedBy {
  id: number
  orgId: number
  empId: string
  fname: string
  lname: string
  primaryEmail: string
  photo: any
  role: string
}
