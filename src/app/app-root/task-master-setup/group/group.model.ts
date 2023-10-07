export interface TaskType {
  id: number;
}

export interface Setup {
  id: string;
}

export interface Group {
  [x: string]: any;
  taskType: TaskType[];
  code: string;
  name: string;
  setup: Setup;
  active: boolean;
  createdBy: string;
  modifiedBy: string;
}

