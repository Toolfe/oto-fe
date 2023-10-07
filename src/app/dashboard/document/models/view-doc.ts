import { FileModel } from "./file-model";

export interface ViewDoc {
    onContextMenu(event:MouseEvent,doc:any,type:string):any;
    openFolder(doc:any):any;
    getFileName(name:string):string;
    getTooltipText(doc:any):any;
    getType(type:string):any;
    addNew():any;
    uploadFile():any;
    downloadFile(file:FileModel):any;
    shareFile(id:String):any;
    renameFile(id:String):any;
    saveFile(id:String):any;
    showProperty(id:String):any;
}

