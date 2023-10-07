import { DocCategory, Setup } from "../category/doc-category-model";

export interface DocTypeModel {
    id?: number;
    code: string;
    name: string;
    documentCategoryId: number;
    contactCategory: [Setup];
    active: boolean;
    createdBy: string;
    createdOn: String;
    modifiedBy: string;
    modifiedOn: String;
    size: number;
    validity: number;
    setup: Setup;
    customFields:any;
    
}