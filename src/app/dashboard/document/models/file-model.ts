export interface FileModel{
     fileId: string;
     objectId?: string;
     fileName: string;
     fileType: string;
     fileSize: number;
     data?: string;
     folder?: any;
     created: string;
     modified: string;
     accessed: string;
     active: boolean;
 }
export interface DocumentType {
        id: number;
}
        
 export interface Employee {
     id: number;
     orgId?: any;
     empId?: any;
     fname?: any;
     lname?: any;
     nationalId?: any;
     mainAddress?: any;
     currentAddress?: any;
     joinDate?: any;
     resigndate?: any;
     divisionCode?: any;
     unitCode?: any;
     departmentCode?: any;
     subDepartmentCode?: any;
     locationCode?: any;
     designationCode?: any;
     primaryEmail?: any;
     secondaryEmail?: any;
     primaryPhone?: any;
     secondaryPhone?: any;
     photo?: any;
     govermentId?: any;
     taxNumber?: any;
     password?: any;
     role?: any;
     currentIndex?: any;
     tokenCreationDate?: any;
     createdOn?: any;
     modifiedOn?: any;
     createdBy?: any;
     modifiedBy?: any;
     active: boolean;
 }

 export interface Permission {
     id: number;
     viewPermission: boolean;
     editPermission: boolean;
     deletePermission: boolean;
 }


 export interface UserGroup {
     id: number;
     empGroup?: any;
     category?: any;
     type?: any;
     workingGroup?: any;
     desgination?: any;
     active: boolean;
 }

 export interface ShareWith {
     id: number;
     users: Employee[];
     userGroups: UserGroup[];
 }



 export interface Approval {
     id: number;
     approval: boolean;
     numberOfApproval: number;
     approvalFrom: Employee[];
 }

 export interface FileRoot {
     id: number;
     fileUpload: FileModel;
     documentType: DocumentType;
     employee: Employee;
     sharedWithMe: boolean;
     saved: boolean;
     trash: boolean;
     permission: Permission;
     shareWith: ShareWith[];
     approval: Approval;
     createdBy: number;
     modifiedBy: number;
     active: boolean;
 }
