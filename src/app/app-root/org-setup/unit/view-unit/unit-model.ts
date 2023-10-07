export interface Setup {
    id: string ;
}

export interface Unit{
        id?: string ;
        divisionName: string;
        locationName: string;
        divisionId: number;
        locationId: number;
        code: string;
        name: string;
        description: string;
        setup: Setup;
        active: boolean;
        createdBy:any;
        modifiedBy:any;
}