
export class Kpi {
  code: string='';
  name: string='';
  setup: Setup=new Setup();
  active: boolean=true;
  createdBy: string='sessionStorage.getItem("id")';
  modifiedBy: string='sessionStorage.getItem("id")';
  static content: Kpi[];
  id?: number;
}

export class Setup {
  id: string=''
}