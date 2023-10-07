export interface Folder{
    id?: number;
    folderName: string;
    parentId: number;
    empId?: any;
    fullPathString?: string;
    fileUpload?: any[];
    fileIdLists?: any[];
    createdOn?: string;
    modifiedOn?: string;
    createdBy?: number;
    modifiedBy?: number;
    active: boolean;
}