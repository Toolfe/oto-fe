import { Byte } from "@angular/compiler/src/util"

export interface AppSetup{

	id:string;
    orgId:String;
    companyName:String;
    legalEntityRef:String;
    businessNature:String;
    address:String;
    adminId:String;
    planDetails:PlanSetup;
}
export interface PlanSetup{
    id:Number;
    plan:PlanInfo;
    paymentStatus:String;
    subscription:Subscription;
    fromDate:Date;
    toDate:Date;
    paymentPeriod:Byte;
    expired:Boolean;
    active:Boolean;
} 
 
export interface PlanInfo{
      id:Number;
	  userLimit:Number;
	  name:String;
	  description:String;
	  intialCost:Number;
	  perUserCost:Number;
	  taskManagement:Boolean;
	  businessProcessAutomation:Boolean;
	  timeAndResourceManagement:Boolean;
	  performanceEvaluation:Boolean;
	  administrationManagement:Boolean;
	  genericAppCreator:Boolean;
	  documentManagement:Boolean;
	  relevantRetrievalManagement:Boolean;
	  globalSearchesWithinOrganization:Boolean;
	  documentScannerAndDigitalSignature:Boolean;
	  vendorManagementSystem:Boolean;
	  customizedForm:Boolean;
}

export interface Subscription{
    id:Number;
	 orgId:Number;
	 description:string; 
	  startDate:Date;
	 endDate:Date;
	  status:string;
	 addUsers:Number;  
	 paymentPeriod:Byte; 
	  paid:Boolean; 
	 createdBy:Number;
	  expired:Boolean;
}