import { CommonMethods } from "src/app/shared/functions/common-methods.service";

export interface ParentSubTask {
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
  typeFields:any;
  createdOn: any
  modifiedOn: any
  assignee: Assignee;
  observers: Observer[]
  dependencies: Dependency[]
  resultant: any
  parentId: number
  parentCategory: any
  subtaskRating: SubtaskRating
  task: Task
  active: boolean
  createdBy: CreatedBy
  modifiedBy: string

}



export interface SubDepartment {
  id: number
}


export interface TaskType {
  id: number
}

export interface Initiator {
  id: number
}


export interface Assignee {
  id: number
  orgId: number
  empId: string
  fname: string
  lname: string
  primaryEmail: string
  photo: any
  role: string
}

export interface Observer {
  id: number
}

export interface Dependency {
  id: number
}

export interface SubtaskRating {
  scaleValue: any
  rating: any
  ratingValue: number
}

export interface Task {
  id: number
}

export interface CreatedBy {
  id: string
}


