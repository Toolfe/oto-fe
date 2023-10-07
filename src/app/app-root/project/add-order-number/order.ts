export interface Order {
    [x: string]: any;
    id: number;
    project:Project
    orderNo:any;
    orderNumber:any,
    orderDetails:any;
    setup:Setup;
    createdBy:any;
    modifiedBy:any;
    }
    
    export interface Project {
      id: number
    }
    export interface Setup {
      id: number
    }