export interface Profiles {
  id:number;
  profileName: string
  createdBy: string
  modifiedBy: string
  active: boolean
  setup: Setup
  organizationModule: OrganizationModule
  contactModule: ContactModule
  taskMasterModule: TaskMasterModule
  employeeModule: EmployeeModule
  assignModule: AssignModule
  businessPartnerModule: BusinessPartnerModule
  projectModule: ProjectModule
  documentMasterModule: DocumentMasterModule
  taskManagementModule: TaskManagementModule
  documentManagementModule: DocumentManagementModule
}

export interface Setup {
  id: string
}

export interface OrganizationModule {
  [x: string]: any;
  
  basicInfo: BasicInfo
  location: Location
  division: Division
  unit: Unit
  department: Department
  subDepartment: SubDepartment
  employeeGroup: EmployeeGroup
  employeeCategory: EmployeeCategory
  employeeType: EmployeeType
  workingGroup: WorkingGroup
  qualification: Qualification
  skillSet: SkillSet
  industrySpecificSkills: IndustrySpecificSkills
  language: Language
  company: Company
  industry: Industry
  designation: Designation
  workProcess: WorkProcess
  resource: Resource
  uoms: Uoms
}

export interface BasicInfo {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Location {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Division {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Unit {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Department {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface SubDepartment {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface EmployeeGroup {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface EmployeeCategory {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface EmployeeType {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface WorkingGroup {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Qualification {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface SkillSet {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface IndustrySpecificSkills {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Language {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Company {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Industry {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Designation {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface WorkProcess {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Resource {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Uoms {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface ContactModule {
  contactCategory: ContactCategory
  contactSubCategory: ContactSubCategory
  contactType1: ContactType1
  contacType2: ContacType2
  functionality: Functionality
}

export interface ContactCategory {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface ContactSubCategory {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface ContactType1 {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface ContacType2 {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Functionality {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface TaskMasterModule {
  type: Type
  group: Group
  kpi: Kpi
  priority: Priority
  expectation: Expectation
  scale: Scale
  rating: Rating
  status: Status
}

export interface Type {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Group {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Kpi {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Priority {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Expectation {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Scale {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Rating {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Status {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface EmployeeModule {
  employeeDetails: EmployeeDetails
}

export interface EmployeeDetails {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface AssignModule {
  assignDetails: AssignDetails
}

export interface AssignDetails {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface BusinessPartnerModule {
  businessPartner: BusinessPartner
}

export interface BusinessPartner {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface ProjectModule {
  project: Project
}

export interface Project {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface DocumentMasterModule {
  category: Category
  type: Type2
}

export interface Category {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Type2 {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface TaskManagementModule {
  allTask: AllTask
  createdByMe: CreatedByMe
  sharedWithMe: SharedWithMe
  saved: Saved
  completed: Completed
  ratings: Ratings
}

export interface AllTask {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface CreatedByMe {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface SharedWithMe {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Saved {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Completed {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Ratings {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface DocumentManagementModule {
  allFiles: AllFiles
  sharedWithMe: SharedWithMe2
  saved: Saved2
  approval: Approval
  trash: Trash
}

export interface AllFiles {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface SharedWithMe2 {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Saved2 {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Approval {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}

export interface Trash {
  creation: boolean
  selection: boolean
  updation: boolean
  deletion: boolean
}
