export class Location {
    id?: number;
    name: string='';
    code: string='';
    description: string='';
    active: boolean=true;
    createdBy: string='sessionStorage.getItem("id")';
    modifiedBy: string='sessionStorage.getItem("id")';
}