export interface Scale {
    id?: number;
   scaleValue:number;
    taskType: string,
    setup: Setup
    active: boolean
    createdBy: string
    modifiedBy: string
}

export interface Setup {
    id: string
}