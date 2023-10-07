export interface Tasks{
  [x: string]: any
  id: number
  orgId: any
  initiator: Initiator
  title: string
  description: string
  project: Project
  // projectName: string
  taskGroup: TaskGroup
  taskType: TaskType[]
  taskCode: string
  estimatedDate: any
  completedOn: any
  target: any
  actual: any
  comparisonFactor: any
  priorityFactor: string
  percentage: any
  ratingCode: any
  parentCategory: any
  parentId: any
  weightage: any
  resultant: any
  status: number
  subTasks?: Subtask[] | any
  messages: any[]
  approval: boolean
  approvedBy: ApprovedBy
  approvalStatus: string
  createdOn: string
  modifiedOn: string
  createdBy: number
  modifiedBy: number
  active: boolean
  activeStatus?:boolean;
  taskTimer?:number;
  typeFields:any;
  type:any;
  assignee: Assignee
  observers: Observer[]
  dependencies:Dependency[],
  initDate: string
  initTime?: string
  completedDate: string
  completedTime?: string
  code: string
  subtaskRating?: SubtaskRating
  subDepartment: SubDepartment,
  customizedStatus:string,
  task: Task,
  taskName:any;
  taskid:number


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

export interface Project {
  id: any
  projectName: string
}

export interface TaskGroup {
  id: number
}

export interface TaskType {
  id: number

}

export interface Subtask {
  id: number
  title: string
  assignee: Assignee
  observers: Observer[]
  initDate: string
  initTime?: string
  estimatedDate: any
  completedDate: string
  completedTime?: string
  subDepartment: number
  taskType: TaskType2
  taskFiles:any[]
  description: string
  code: string
  target: string
  actual: any
  comparisonFactor: any
  priorityFactor: string
  ratingCode: any
  parentCategory: any
  parentId?: number
  resultant: any
  type:any;
  status: number
  initiator: Initiator2
  subtaskRating?: SubtaskRating
  createdOn: string
  modifiedOn: string
  createdBy: any
  modifiedBy: number
  active: boolean
}

export interface Assignee {
  id: number
  orgId: number
  empId?: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}
export interface Dependency {
  id: number
}

export interface Observer {
  id: number
  orgId: number
  empId?: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}
export interface SubDepartment {
  id: number
}

export interface TaskType2 {
  id: number
  code: string
  name: string
  department: string
  duration: number
  scaleValue: string
  active: boolean
  task: any
}

export interface Initiator2 {
  id: number
  orgId: number
  empId: any
  fname: any
  lname: string
  primaryEmail: string
  photo: any
  role: string
}

export interface SubtaskRating {
  id: number
  scaleValue: number
  ratingValue: string
  rating: string
}

export interface ApprovedBy {
  id: number
  orgId: number
  empId: string
  fname: any
  lname: any
  primaryEmail: string
  photo: any
  role: string
}

export interface Task {
  id: any
}