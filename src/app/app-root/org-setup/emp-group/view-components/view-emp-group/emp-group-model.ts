export class Setup {
    id: string='';
}

export class EmpGroup {
    id:any;
    divisionCode: string='';
    locationCode: string='';
    code: string='';
    name: string='';
    description: string='';
    setup: Setup=new Setup();
    active: boolean=true;
    createdBy: any='sessionStorage.getItem("id")';
    modifiedBy: any='sessionStorage.getItem("id")';
}