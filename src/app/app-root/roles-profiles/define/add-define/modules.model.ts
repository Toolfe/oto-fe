export interface TreeData {
    id: number
    modules: Module[]
  }
  
  export interface Module {
    id: number
    moduleName: string
    screens: Screen[]
    tables: Table[]
  }
  
  export interface Screen {
    id: number
    screenName: string
    parentCategory: string
    parentId: string
    dataFields: DataField[]
  }
  
  export interface DataField {
    id: number
    dataFieldName: string
    parentCategory: string
    parentId: string
  }
  
  export interface Table {
    id: number
    tableName: string
    parentCategory: string
    api: string
    parentId: string
  }