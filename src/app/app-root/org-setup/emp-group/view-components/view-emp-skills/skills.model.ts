export class Setup {
    id: string='';
}

export class Skills {
  
    code: string='';
    name: string='';
    description: string='';
    setup: Setup=new Setup();
    active: boolean=true;
    createdBy: any='sessionStorage.getItem("id")';
    modifiedBy: any='sessionStorage.getItem("id")';
  id?: number;
}