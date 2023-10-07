

export interface Type {
    id?: number;
    code: string;
    name: string;
    department: string;
    departmentId: number;
    expectations: Expectation;
    taskExpectation :TaskExpectation[];
    scaleValue: number;
    recurrence: Recurrence;
    setup: Setup;
    active: boolean;
    createdBy: any;
    modifiedBy: any;
    customFields:any;
    taskTypeFields:any;

  }
  
  export interface Recurrence {
    id: any;
    type:number;
    repeatEvery: number;
    occurOnDays: string;
    repeatEveryWeek: string;
    repeatEveryMonth:string;
    repeatEveryYear:string;
    day:  string;
    dateByte: number; 
    saveTime:any;
    endAfter: any;
    endDate: string;
    months:any;
    neverEnds: boolean;
    endsOn:any;
  }
  
  export interface Setup {
    id: string;
  }
  export interface Expectation {
    id: string;
    expectations: string;
  }
  export interface TaskExpectation {
    expectationId: number;
   
  }
  