import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, } from 'rxjs';
import { catchError, map, reduce } from 'rxjs/operators';
import { SetupRootService } from 'src/app/app-root/setup-service/setup-root/setup-root.service';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { URLService } from 'src/app/shared/Url/url';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as XLSXStyle from 'xlsx-js-style';
import { Workbook, Column, Cell, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class TaskService {


  inprogressData: any[] = []

  task: any = {};
  taskData: any;
  subTaskData: any[] = [];
  subTaskDataByEmp: any;
  selectedTaskData: any[] = []

  selectedDropTask: any;
  ctask: any;

  latitude: number | undefined;
  longitude: number | undefined;
  locationError: string | undefined;
  locationDetails: any;
  selectedTask: any;
  selectedSubTask: any;
  updatedSubTaskData: any;
  currentTaskId: any;
  currentSubtaskId: any;

  taskUrl = 'http://localhost:2056/org/api/v1/'

  mergeObs: any;

  mergeTaskData: any[] = [];
  completedMergeTaskData: any[] = [];


  getMasterData(code: string): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'taskapi/master/' + code, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  getTaskTypeFileds(taskTypeId: any) {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/task-type/' + taskTypeId, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  getDepartment(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'departmentapi/department', this.root.getHeadersnode());
  }



  public getTaskId(): String | null {
    let taskId = sessionStorage.getItem('taskId');
    return taskId;
  }
  selectedTask$ = this.http.get<any>(this.getTaskUrl() + 'task/' + this.getTaskId(), this.getHeaders())
    .pipe(catchError(this.common.errorHandl));


  subTask$: any = this.http.get<any>(this.getTaskUrl() + 'subtask/assignee/' + sessionStorage.getItem('id'), this.root.getHeaders());

  task$: any = this.http.get<any>(this.root.getProcessUrl() + 'taskapi/task/', this.root.getHeadersnode())

  createdBy$: any = this.http.get<any>(this.getTaskUrl() + 'task/createdBy/', this.root.getHeaders())

  mergeTask$: any = this.mergeTasks().pipe(
    map((res: any) => {
      return res;
    }),
  )

  getAllTask(data:any) {
    return this.http.post<any>(this.root.getProcessUrl() + 'taskapi/taskget/', JSON.stringify(data), this.root.getHeadersnode());
  }

  completedTask$: any = this.http.get<any>(this.getTaskUrl() + 'task/completed/' + sessionStorage.getItem('id'), this.root.getHeaders())
  completedSubTask$: any = this.http.get<any>(this.getTaskUrl() + 'subtask/completed/' + sessionStorage.getItem('id'), this.root.getHeaders())





  constructor(
    private http: HttpClient,
    private common: AuthService,
    private root: SetupRootService

  ) {

  }


  mergeTasks() {

    let observableA = this.task$.pipe(map((res: any) => { res.map((task: any) => { task.type = 'task', task.expandable = true }); return res }));
    let observableB = this.subTask$.pipe(map((res: any) => { res.map((task: any) => { task.type = 'subTask', task.expandable = false }); return res }));
    let combine$ = merge(observableA, observableB).pipe(reduce((a: any, b: any) => a.concat(b)));
    return combine$.pipe(map((res: any) => {
      this.mergeTaskData = res;
      return res.sort((x: { createdOn: string | number | Date; }, y: { createdOn: string | number | Date; }) => +new Date(x.createdOn) - +new Date(y.createdOn));
    }))
  }

  mergeCompletedTasks() {
    let observableA = this.completedTask$.pipe(map((res: any) => { res.map((task: any) => { task.type = 'task' }); return res }));
    let observableB = this.completedSubTask$.pipe(map((res: any) => { res.map((task: any) => { task.type = 'subTask' }); return res }));
    let combine$ = merge(observableA, observableB).pipe(reduce((a: any, b: any) => a.concat(b)));
    return combine$.pipe(map((res: any) => {
      console.log(res, 'res');

      this.completedMergeTaskData = res;
      return res.sort((x: { createdOn: string | number | Date; }, y: { createdOn: string | number | Date; }) => +new Date(x.createdOn) - +new Date(y.createdOn));
    }))
  }




  //return  res.sort((x: { createdOn: string | number | Date; }, y: { createdOn: string | number | Date; }) => +new Date(x.createdOn) - +new Date(y.createdOn));
  public getHeaders() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      }),


    }

    return httpOptions;
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    })

  }


  public getHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      }),


    }
  }
  public getTaskUrl(): String {
    let url: String = 'http://localhost:2056/task/api/v1/';
    return url;
  }

  public getTaskHistoryUrl(): String {
    let url: String = 'http://localhost:2056/task/api/v1/';
    return url;
  }

  public getTaskFileUrl(): String {
    let url: String = 'http://localhost:2056/subtask/api/v1/';
    return url;
  }

  taskCreationPost(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'taskapi/task/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }
  taskCreationDuplication(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'taskapi/task-duplicate/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  getTaskById(): Observable<any> {
    let id = sessionStorage.getItem('rootId');
    return this.http.get(this.root.getProcessUrl() + 'taskapi/task/' + id, this.root.getHeadersnode());
  }
  getSubtaskByIdAssignee(): Observable<any> {
    let id = sessionStorage.getItem('subtaskId');
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-assignee-view/' + id, this.root.getHeadersnode());
  }

  getSubtaskByTaskId1(id: number): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.get(this.root.getProcessUrl() + 'taskapi/task-child/' + id, this.root.getHeadersnode());
  }

  getSubtaskByTaskId(data:any): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.post(this.root.getProcessUrl() + 'taskapi/task-child' ,JSON.stringify(data) , this.root.getHeadersnode());
  }

  getSubtaskBySubtaskId(data:any): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.post(this.root.getProcessUrl() + 'taskapi/subtask-child' ,JSON.stringify(data), this.root.getHeadersnode());
  }

  getSubtaskAssigneeChild(data: any): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.post(this.root.getProcessUrl() + 'subtaskapi/subtask-assignee-child',JSON.stringify(data), this.root.getHeadersnode());
  }
  getSubtaskObserversChild(data: any): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.post(this.root.getProcessUrl() + 'subtaskapi/subtask-observers-child' ,JSON.stringify(data), this.root.getHeadersnode());
  }

  getSubtaskCompletedChild(data: any): Observable<any> {
    // let id = sessionStorage.getItem('rootId');
    return this.http.post(this.root.getProcessUrl() + 'subtaskapi/subtask-completed-child',JSON.stringify(data), this.root.getHeadersnode());
  }


  // getTask(): Observable<any> {

  //   let id = sessionStorage.getItem('id');
  //   let url = this.root.stringifyUrl(this.getTaskUrl() + 'task/emp/' + id);
  //   return this.http.get<any>(url, this.getHeader())
  //     .pipe(map((res: any) => {
  //       return res;
  //     })); 
  // }
  getTask(): Observable<any> {
    return this.http.get("../../../../assets/data/all-task-listing.json")
      .pipe(map((res: any) => {
        return res.data;
      }));
  }



  // getTaskById(): Observable<any> {
  //   let id = sessionStorage.getItem('rootId');
  //   let url = this.root.stringifyUrl(this.getTaskUrl() + 'task/' + id);
  //   return this.http.get<any>(url, this.getHeader())
  //     .pipe(map((res: any) => {
  //       this.selectedTaskData = res;
  //       return res;
  //     }));
  // }
  getTaskType(): Observable<any> {
    return this.http.get("../../../../assets/data/tasktype-listing.json");
  }
  getSubDepartment(typeId: any): Observable<any> {
    return this.http.get("../../../../assets/data/subdepartment-listing.json");
  }
  getEmployee(): Observable<any> {
    return this.http.get("../../../../assets/data/dashboard-employeestatus.json");
  }

  getTaskByCreatedBy(data:any): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'subtaskapi/task-creator');
    return this.http.post<any>(url, JSON.stringify(data) ,this.root.getHeadersnode());
  }

  getTaskByObserver(data:any): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'subtaskapi/subtask-observers');
    return this.http.post<any>(url,JSON.stringify(data), this.root.getHeadersnode()) 
  }

  getTaskByAssignee(data:any): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'subtaskapi/subtask-assignee');
    return this.http.post<any>(url, JSON.stringify(data), this.root.getHeadersnode());
  }

  getQuickAccessAssignMe(): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'quickaccessapi/quick-access-assign-me');
    return this.http.get<any>(url, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  getQuickAccessAssignBy(): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'quickaccessapi/quick-access-assign-by');
    return this.http.get<any>(url, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  getQuickAccessCompleted(): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'quickaccessapi/quick-access-completed');
    return this.http.get<any>(url, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }
  getTaskByCompleted(data:any): Observable<any> {
    let url = this.root.stringifyUrl(this.root.getProcessUrl() + 'subtaskapi/subtask-completed');
    return this.http.post<any>(url,JSON.stringify(data),this.root.getHeadersnode())

  }

  updateTask(data: any): Observable<any> {
    data.orgid = sessionStorage.getItem('orgId')
    return this.http.put<any>(this.getTaskUrl() + 'task/', JSON.stringify(data), this.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  //delete
  deleteTask(id: any): Observable<any> {
    return this.http.delete<any>(this.root.getProcessUrl() + 'taskapi/task/' + id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.locationError = undefined;
        },
        (error) => {
          this.locationError = 'Error getting location: ' + error.message;
        }
      );
    } 
  }

  // getLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.latitude = position.coords.latitude;
  //         this.longitude = position.coords.longitude;
  //         this.locationError = undefined;
  //         return position;
  //       },
  //       (error) => {
  //         this.locationError = 'Error getting location: ' + error.message;
  //       }
  //     );
  //   } else {
  //     this.locationError = 'Geolocation is not supported by this browser.';
  //   }
  // }


  //////// Sub Task ///////

  // subTaskCreationPost(data: any): Observable<any> {
  //   return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask/', JSON.stringify(data), this.root.getHeadersnode())
  //     .pipe(
  //       catchError(this.common.errorHandl),
  //       map((res: any) => {
  //         return res;
  //       }));
  // }
  subTaskCreationPost(data: any) {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask/', data, URLService.uploadHeader())
      .pipe(catchError(this.common.errorHandl));
  }

  getAttachments(subTakId: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'subtaskapi/attachment/' + subTakId, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }


  downloadAttachment(data: any) {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/download', JSON.stringify(data), URLService.downloadHeader());
  }

  updateSubTaskRating(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-rating/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }
  updateSubTaskType(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-tasktype/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  updateSubTaskActiveStatus(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-activestatus/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  updateBreakTime(status: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'breakapi/break/' + status, this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }
  updateCheckInTime(status: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'checkinapi/checkin/' + status, this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }

  getUserBreakList() {
    return this.http.get<any>(this.root.getProcessUrl() + 'breakapi/break/', this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }

  getUserCheckInList() {
    return this.http.get<any>(this.root.getProcessUrl() + 'checkinapi/checkin/', this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }

  getAlertData(status: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'breakapi/break-alert/'+ status, this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }

  getAlertDataCheckIn(status: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'checkinapi/checkin-alert/'+ status, this.root.getHeadersnode())
      .pipe(catchError(this.common.errorHandl))
  }


  getSubTaskComment(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-activestatus-comments/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  updateSubTaskStatus(data: any): Observable<any> {
    return this.http.post<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-status', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateSubTask(data: any): Observable<any> {
    return this.http.post<any>(this.getTaskUrl() + 'subtaskapi/subtask-status', JSON.stringify(data), this.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getTaskHistory(id: number) {
    return this.http.get<any>(this.root.getProcessUrl() + 'subtaskapi/subtask-history/' + id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  getSubTask(): Observable<any> {

    let id = sessionStorage.getItem('subtaskId');
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtask/get/' + id);
    return this.http.get<any>(url, this.getHeader())
      .pipe(map((res: any) => {
        this.subTaskData = res;
        return res;
      }));
  }

  getAllSubTask(): Observable<any> {
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtasks/');
    return this.http.get<any>(url, this.getHeader())
      .pipe(map((res: any) => {
        return res;
      }));
  }


  getSubTaskByParentId(): Observable<any> {
    let id = sessionStorage.getItem('subtaskId')
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtask/parent/' + id);
    return this.http.get<any>(url, this.getHeader())
      .pipe(map((res: any) => {
        this.subTaskData = res;
        return res;
      }));
  }


  getSubTaskById(): Observable<any> {
    let id = sessionStorage.getItem('id');
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtask/assignee/' + id);
    return this.http.get<any>(url, this.getHeader())
      .pipe(map((res: any) => {
        res.map((task: any) => { task.type = 'subTask' });
        console.log(res, 'ressss');

        return res
      }));
  }

  viewSubTaskById(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask/' + id, this.root.getHeadersnode());
  }
  viewSubTaskDataById(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-data/' + id, this.root.getHeadersnode());
  }
  getSubTaskDependencies(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-dependences/' + id, this.root.getHeadersnode());
  }

  getSubTaskOrders(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-orders/' + id, this.root.getHeadersnode());
  }
  getTasks(): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'quickaccessapi/task-list',this.root.getHeadersnode());
  }
  getSubTaskTypes(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-tasktypes/' + id, this.root.getHeadersnode());
  }
  getSubTaskPartners(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-partners/' + id, this.root.getHeadersnode());
  }

  getSubTaskSubdepartments(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-subdepartments/' + id, this.root.getHeadersnode());
  }
  getSubTaskDependenciesStatus(id: number): Observable<any> {
    return this.http.get(this.root.getProcessUrl() + 'subtaskapi/subtask-dependences-status/' + id, this.root.getHeadersnode());
  }


  /*  getSubTaskById(...params:any): Observable<any> {
     let offset=params[0]?params[0]:1;
     let limit=params[1]?params[1]:50000000;
     let sort=params[2]?params[2]:'id';
     let order=params[3]?params[3]:2;//DESC
     let id = sessionStorage.getItem('id');
     let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtask/assignee/' + id,"/"+offset,limit,sort,order);
     return this.http.get<any>(url, this.getHeader())
       .pipe(map((res: any) => {
         return res;
       }));
   }
  */


  deleteSubTask(data: any): Observable<any> {
    return this.http.delete<any>(this.getTaskUrl() + 'subtask/' + data.id, this.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }





  approveTask(data: any): Observable<any> {
    return this.http.post<any>(this.getTaskUrl() + 'approval/', JSON.stringify(data), this.getHeaders())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  getCompletedTaskByAssignee() {
    let id = sessionStorage.getItem('id')
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'subtask/completed/' + id)
    return this.http.get<any>(url, this.getHeaders())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          res.map((task: any) => { task.type = 'subTask' });
          console.log(res, 'ressss');

          return res
        }));
  }
  getCompletedTaskByInitiator() {
    let id = sessionStorage.getItem('id')
    return this.http.get<any>(this.getTaskUrl() + 'task/completed/' + id, this.getHeaders())
      .pipe(
        catchError(this.common.errorHandl),
        map((res: any) => {
          res.map((task: any) => { task.type = 'task' });
          console.log(res, 'ressss');

          return res
        }));
  }


  pathchTimmer(id: number, data: any, method: number) {
    return this.http.patch<any>(this.getTaskHistoryUrl() + 'timmer/' + method + "/" + id, JSON.stringify(data), this.getHeader())
      .pipe(map((res: any) => { return res }));
  }

  postTaskFile(file: File, fileUpload: any) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('fileUpload', JSON.stringify(fileUpload));
    return this.http.post<any>(URLService.getFileURL() + 'file/api/v1/taskFile', formData, URLService.uploadHeader());
  }


  postFileDetails(fileData: any, taskId: any, name: String) {
    let obj: any = {};
    obj.fileId = fileData.awsStorageId;
    obj.fileName = fileData.fileName;
    obj.fileSize = fileData.fileSize;
    obj.fileKey = name;
    obj.subtask = { id: taskId };

    console.log(obj);
    return this.http.post<any>(this.getTaskFileUrl() + 'addFile/', JSON.stringify(obj), this.getHeaders())
      .pipe(catchError(this.common.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  /* getProjectAndStatus(data:any): Observable<any> {
    let url = this.root.stringifyUrl(this.getTaskUrl() + 'task/dashboard/');
    return this.http.post<any>(url, this.getHeader())
      .pipe(map((res: any) => {
        return res;
      })); 
  } */

  // postProjectAndStatus(data: any) {
  //   console.log(data,'data');
  //   return this.http.post<any>(this.getTaskUrl() + 'task/dashboard', JSON.stringify(data), this.getHeader())
  //   .pipe(map((res: any) => {
  //     return res;
  //   })); 
  // }
  postProjectAndStatus(data: any): Observable<any> {
    return this.http.post("../../../../assets/data/dashboard-projectstatus-filter.json", JSON.stringify(data));
  }
  // getOverridingSubtask(): Observable<any> {
  //   return this.http.get("../../../../assets/data/dashboard-overridingtask.json");
  // }
  getalltasklist(): Observable<any> {
    return this.http.get("../../../../assets/data/all-task-listing.json");
  }
  getsubtasklist(id: number): Observable<any> {
    return this.http.get("../../../../assets/data/subtask-listing.json");
  }
  postProjectFreference(data: any) {
    return this.http.post<any>(this.getTaskUrl() + 'savepreference', JSON.stringify(data), this.getHeader())
      .pipe(map((res: any) => {
        return res;
      }));
  }
  updateProjectPreference(data: any) {
    return this.http.put<any>(this.getTaskUrl() + 'savepreference', JSON.stringify(data), this.getHeader())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // getProjectAndStatus(id:any) {
  //   return this.http.get<any>(this.getTaskUrl() + 'task/dashboard/'+id, this.getHeader())
  //   .pipe(map((res: any) => {
  //     return res;
  //   })); 
  // }


  // getProjectAndStatus(): Observable<any> {
  //   return this.http.get("../../../../assets/data/dashboard-projectstatus.json");
  // }

  getPreferenceId(id: number) {
    return this.http.get<any>(this.getTaskUrl() + 'savepreference/' + id, this.getHeaders())
      .pipe(catchError(this.common.errorHandl))
  }


  // postEmpTaskDetails(data: any) {

  //   return this.http.post<any>(this.getTaskUrl() + 'task/dashboard2/', JSON.stringify(data), this.getHeaders())
  //     .pipe(map((res: any) => {
  //       return res;
  //     }));
  // }

  employeeDashboardStatus(data: any) {

    return this.http.post<any>(this.root.getEmployeeUrl() + 'dashboardapi/dashboard-emp-status/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getOverridingSubtask(): Observable<any> {
    return this.http.get(this.root.getEmployeeUrl() + 'dashboardapi/dashboard-priority-tasks', this.root.getHeadersnode());
  }

  getProjectAndStatus(): Observable<any> {
    return this.http.get(this.root.getEmployeeUrl() + 'dashboardapi/dashboard-project-status', this.root.getHeadersnode());
  }

  postProjectLevel(): Observable<any> {
    return this.http.get(this.root.getEmployeeUrl() + 'dashboardapi/dashboard-project-level', this.root.getHeadersnode());
  }

  // getEmpDetails(id: number) {
  //   return this.http.get<any>(this.getTaskHistoryUrl() + 'alltaskhistory/' + id, this.getHeaders())
  //     .pipe(catchError(this.common.errorHandl))
  // }

  getEmpDetails(data: any) {
    return this.http.post<any>(this.root.getProcessUrl() + 'historyapi/emp-history', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res.data;
      }));
  }

  // postProjectLevel(data:any) {
  //   return this.http.post<any>(this.getTaskUrl() + 'task/dashboard4',JSON.stringify(data), this.getHeader())
  //   .pipe(map((res: any) => {
  //     return res;
  //   })); 
  // }
  // postProjectLevel(): Observable<any> {
  //   return this.http.get("../../../../assets/data/dashboard-projectlevel.json");
  // }
  postProjectLevelPreference(data: any) {
    return this.http.post<any>(this.getTaskUrl() + 'projectlevel/savepreference', JSON.stringify(data), this.getHeader())
      .pipe(map((res: any) => {
        return res;
      }));
  }
  updateProjectLevelPreference(data: any) {
    return this.http.put<any>(this.getTaskUrl() + 'projectlevel/savepreference', JSON.stringify(data), this.getHeader())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getprojectLevelPreferenceId(id: number) {
    return this.http.get<any>(this.getTaskUrl() + 'projectlevel/savepreference/' + id, this.getHeaders())
      .pipe(catchError(this.common.errorHandl))
  }


  getprojectLevel(id: number) {
    return this.http.get<any>(this.getTaskUrl() + 'task/dashboard4/' + id, this.getHeaders())
      .pipe(catchError(this.common.errorHandl))
  }

  // exportToExcel(headers: string[], data: any[], filename: string, sheetName: string) {
  //   const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header: headers });
  //   XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   FileSaver.saveAs(excelBlob, filename + '.xlsx');
  // }
  generateExcel(json: any[], title: string, fieldheader: any[], header: any[], excelFileName: string): void {

    // Excel Title, Header, Data
    const data = json;
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet();
    // const worksheet2 = workbook.addWorksheet();
    // Add Header Row
    const headerRow = worksheet.addRow(header);
    // const headerRow2 = worksheet.addRow(header);
    headerRow.font = { name: 'arial', family: 4, size: 10 };

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }

      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });


    data.forEach(d => {
      const rows: any = [];

      fieldheader.forEach((head, index) => {

        if (head !== 'attachment') {
          rows[index + 1] = d[head];
        } else {
          if (d[head] !== null) {
            rows[index + 1] = 'Available';
          } else {
            rows[index + 1] = 'Unavailable';
          }
        }
      });

      const row = worksheet.addRow(rows);

      if (d.subtaskTitle == 'BREAK') {
        row.eachCell((cell: Cell) => {
          cell.font = { color: { argb: 'FF4C1487' },
          bold: true // Make the font bold
         }; // Red font color
          
      });
        // row.eachCell((cell: Cell) => {
        //     cell.fill = {
        //         type: 'pattern',
        //         pattern: 'solid',
        //         fgColor: { argb: 'FFFF0000' } // Red color
        //     };
        // });
    }



      // Enable text wrapping for each cell in the row
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { wrapText: true };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    });
    headerRow.eachCell((cell: Cell, colNumber: number) => {
      const column: Column = worksheet.getColumn(colNumber) as Column;
      const headerWidth = (cell.value?.toString() || '').length + 2 || 10;
      const dataWidth = data.reduce((max, d) => {
        const cellValue = (d[fieldheader[colNumber - 1]] + '') as string;
        return Math.max(max, cellValue.length + 2);
      }, headerWidth);
      column.width = Math.min(100, Math.max(headerWidth, dataWidth)); // Set a maximum width of 100

      // Set the column header to be a single string
      column.header = header[colNumber - 1] || '';
    });


    worksheet.addRow([]);
    workbook.xlsx.writeBuffer().then((datalist) => {
      const blob = new Blob([datalist], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // const filename = title+'_'+date+'.xlsx';
      fs.saveAs(blob, title);
    });
  }

  convertTimestampToDateTime(timestamp: number): Date {
    return new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  }
}