export interface Rating {
    id?:number;
    code:any;
    value:any;
    setup: Setup
    active: boolean
    createdBy: string
    modifiedBy: string
}

export interface Setup {
    id: string
}