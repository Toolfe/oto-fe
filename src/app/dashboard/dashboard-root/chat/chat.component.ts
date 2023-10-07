import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatService } from './chat-service/chat.service';
import { TaskService } from "../../task/service/task-service.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],

})
export class ChatComponent implements OnInit ,OnDestroy{
  isHidden: boolean = true;
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;


  deleteButtonLabel: any
  deleteButtonIcon = 'close'
  @Input()
  multiple: boolean = false
  @ViewChild('fileUpload')
  fileUpload: any = ElementRef
  inputFileName: string = ''
  messages: any[] = [];
  empMessages: any[] = [];
  dataRow: any = {};

  files: File[] = []
  filesData: any;


  taskData: any;

  attachment: any

  chatSubscription!:Subscription;
  constructor(private fb: FormBuilder,
    private service: ChatService,
    private taskservice: TaskService,
  ) { }

  chatForm: any = FormGroup;
  attachForm: any = FormGroup;
  currentUser: any = 1;

  selectedFile?: File | string;

  taskId: any;

  convertedJson!: any

  timeStamp:any;
  ngOnInit(): void {

    this.getChat();
    this.getTask();
   this.getChatEmp(); 
  


    this.chatForm = this.fb.group({
      text: [],
      ref_id: 100,
  
    })
  }

  onClick() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    let data: any[] = [];
    data.push(this.selectedFile);
    this.filesData = data


  }




  removeFile(file: any) {
    this.filesData = [];
    this.selectedFile = undefined;
    this.clearInputElement()
  }




  clearInputElement() {
    this.fileUpload.nativeElement.value = ''
    this.removeFile(this.fileUpload.nativeElement.value)
  }







  public sendMessage() {
    if (this.chatForm.valid == true) {
      let task: any = {};
      task.id = sessionStorage.getItem('taskId');
      let chatData: any = {};
      let messageData = this.chatForm.value;
      messageData.createdBy = sessionStorage.getItem('id')
      messageData.task = task;
      messageData.active = true;
      chatData = messageData;
      if (messageData.text == null) {
        messageData.text = '';
      }
      if(messageData.text==''){
        this.chatForm.valid=true
      }

      this.scrollToBottom();
      this.service.chatPost(chatData, this.selectedFile).subscribe((res: any) => {
         this.timeStamp=res.timeStamp;
        this.selectedFile = undefined;
        this.filesData = [];
        this.chatForm.reset();
        this.getChat();

      })
    }
  }





  
 


  getChat() {
    this.chatSubscription=this.service.getChat(sessionStorage.getItem('taskId')).subscribe((res: any) => {
      this.messages = res
    })
  }
  
  getChatEmp(){
    this.service.getChatEmp(sessionStorage.getItem('id')).subscribe((res: any) => {
      this.empMessages = res

    })
  }


  scrollToBottom(): any {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  getTask() {
    this.taskservice.getTaskById().subscribe(res => {
      this.taskId = res.id;
    })

  }


  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

}




