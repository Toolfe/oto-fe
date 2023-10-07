  export class Setup {
        id: string=''
    }

    export class SubCategory {
        name: string='';
        description: string='';
        setup: Setup=new Setup();
        active: boolean=true;
        createdBy: any='sessionStorage.getItem("id")';
        modifiedBy: any='sessionStorage.getItem("id")';
      id?: number;
      businessPartnerCategoryId: any;
      businessPartnerCategory: any;
    }
