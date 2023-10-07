export interface Status {
    type: string;
    name: string;
    id?: number;
    genericStatus:any;
    customizedStatus:any;
    setup: Setup
    active: boolean
    createdBy: string
    modifiedBy: string
}

export interface Setup {
    id: string
    type: string;
    name: string;
}