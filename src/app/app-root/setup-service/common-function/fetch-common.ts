import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class FetchCommon{


    fetchCommon(array1:any, array2:any, code1:any, code2:any){
        let element1=array1.filter((data:any)=>data.code==code1)[0]; 
        let element2=array2.filter((data:any)=>data.code==code2)[0]; 
        let finalArray:any[]=[];
        element1.units.forEach((data1: any) => {
           element2.units.forEach((data2: any) => {
             if (data1.code == data2.code) {
               finalArray.push(data1)
             }
           });  
        });
                   
    return finalArray;
    }


    getName($array:any,array1:any,dataCode:string,dataName:string){
      if($array!=undefined){
      $array.forEach((element:any,i:number) => {
          array1.forEach((data:any) => {
            if(data.code==element[dataCode]){
              $array[i][dataName]=data.name;
            
              
            }});
        })};
      };

      
}