export class Setup {
    id: any='';
}

export class Functionality {
    name: string='';
    description: string='';
    setup: Setup=new Setup();
    active: boolean=true;
    createdBy: any='sessionStorage.getItem("id")';
    modifiedBy: any='sessionStorage.getItem("id")';
  id?: number;
}