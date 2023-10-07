import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  arr3:any=[];
  arr4:any=[];
  constructor() { }

  ngOnInit(): void {
  
    this.subtask.forEach((element:any) => {
      console.log(element,'element');
       let array1:any=[];
      let array2:any=[];
      let typeField:any=JSON.parse(element.typeFields)
      typeField.title=element.title
      typeField.id=element.id
      array1.push(typeField)
      if(array2.length==0){
        this.arr4.push(typeField)
        console.log(this.arr4,'arr4');
      }
    });
  }
  
  subtask:any= [
    {
      id: 1,
      title: "sub task",
      code: "O1000ST001",
      assignee:"benish",
      initDate: "12/30/2022, 4:08:56 PM",
      completedDate: null,
      subDepartment: "SD1",
      taskType: "T1",
      description: "sub task des",
      target: "2022-12-30T16:09",
      priorityFactor: "overriding",
      project:"project1",
      status: 2,
      customizedStatus: "Completed",
      initiator: "benish",
      typeFields: "{\"Name\": \"Benish\"}", 
      name:'ben',
      email:"123@"
    },
    {
      id: 2,
      title: "sub task 1",
      code: "O1000ST001",
      assignee:"benish",
      initDate: "12/30/2022 4:08:56 PM",
      completedDate: null,
      subDepartment: "SD1",
      taskType: "T1",
      description: "sub task des",
      target: "2022-12-30T16:09",
      priorityFactor: "overriding",
      project:"project1",
      status: 2,
      customizedStatus: "Completed",
      initiator: "benish",
       typeFields: "{\"Name\": \"Benish\"}", 
      name:'ben',
      email:"123@"
    }
   
    
  ]

  content:any=[
    {
      id:1,
      name:"A",

    },
    {
      id:2,
      name:"B"
    }
  ]

  array:any=[];
  file(){
    for(let i=0; i<this.arr4.length; i++){
      var o;
      var newArray:any=[];
      for(o in this.arr4[i]){
        newArray.push(o)
      }
      break;
    }
    this.array.push(newArray)
    for(let i=0; i<this.arr4.length; i++){
      this.array.push(Object.values(this.arr4[i]))
    
    }
    var CsvString =""
    this.array.forEach((RowItem:any,RowIndex:any)=>{
      RowItem.forEach((colItem:any,colIndex:any)=>{
        CsvString += colItem + ',';
       
      })
      CsvString +="\r\n"
      
    })
    CsvString="data:application/csv," + encodeURIComponent(CsvString)
    var x=document.createElement("A");
    x.setAttribute("href",CsvString);
    x.setAttribute("download","somedata.csv");
    document.body.appendChild(x);
    x.click();
    this.array=[];


  }

}
