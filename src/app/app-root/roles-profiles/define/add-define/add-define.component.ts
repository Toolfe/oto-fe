import { NestedTreeControl } from '@angular/cdk/tree';
import { Component,OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ModulesService } from 'src/app/app-root/setup-service/role-setup/modules/modules.service';


interface Module {

}

@Component({
  selector: 'app-add-define',
  templateUrl: './add-define.component.html',
  styleUrls: ['./add-define.component.scss']
})
export class AddDefineComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();


  modules:any;

  constructor(private rolesetup:ModulesService) {
    this.getModules();
    this.dataSource.data = this.modules;
  
   }

  ngOnInit(): void {
      
  }

  getModules(){
    this.rolesetup.getModule().subscribe(data=>{
      this.modules=data.modules;
    });
  }
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
}


