import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { Constant } from 'src/app/constant/Constant';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
declare var $: any;

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @ViewChild(PaginationComponent) myPagination: any;
  currentDate: any ="";
  nextDate: any ="";
  dataList: any = [];
  searchDataList: any = [];
  wid: any = "";
  location: any = "";
  schedulerDate: any = "";
  widList: any = [];
  locationList: any = [];
  selectedLocationList: any = []
  multiselectSettings = {};
  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent, private datePipe : DatePipe){
      layout.setPageTitle("Schedule WID")
  }

  ngOnInit(): void {
    this.multiselectSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.currentDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 1)
    this.nextDate = this.datePipe.transform(curDate,'yyyy-MM-dd');

    this.getDataForScheduleWid();
    this.getScheduledWid();
  }

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  getScheduledWid(){
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"scheduledWid"
    }
    this.sharedService.getAllList(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        this.dataList = result;
        this.searchDataList = this.dataList;
        this.layout.spinnerHide();

        // this.searchSmsLog("");
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getWid"))
        this.layout.spinnerHide();
      }
    })
  }

  getDataForScheduleWid(){
    let jsonData = {
      searchType:"dataForScheduleWid"
    }
    this.sharedService.getAllList(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        this.widList = result.widList;
        this.locationList = result.locationList;
        // console.log(this.locationList)
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getDataForScheduleWid"))
        this.layout.spinnerHide();
      }
    })
  }

  scheduleWid(){
    if(this.wid == ""){
      this.layout.warningSnackBar("Please select WID");
      return;
    }
    else if(this.selectedLocationList.length == 0){
      this.layout.warningSnackBar("Please select Location");
      return;
    }
    else if(this.schedulerDate == ""){
      this.layout.warningSnackBar("Please select Date");
      return;
    }
    // console.log(this.selectedLocationList)
    let jsonData = {
      insertType:"scheduleWid",
      wid: this.wid,
      selectedLocationList: this.selectedLocationList,
      schedulerDate: this.schedulerDate
    }

    this.sharedService.insertData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.layout.successSnackBar(result.message);
          this.closeAnyModal('widModal');
          $(".resetField").val("");
          this.selectedLocationList = [];
          this.dataList = [];
          this.searchDataList = this.dataList;
          this.getScheduledWid();
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("scheduleWid"))
      }
    })
  }

  searchWid: any ="";
  searchWhatsappId(evt:any){
    this.searchDataList = this.dataList.filter
    (
      (x: 
        { 
          WID: any;
        }
      ) => 
      x.WID.toLowerCase().includes(this.searchWid.toLowerCase())
    );
    this.myPagination.itemCount = this.searchDataList.length;
    this.myPagination.createPagination();
  }


  openAnyModal(modalId:any){
    // $("#"+modalId).modal({
    //   backdrop : 'static',
    //   keyboard : false
    // });
    $("#"+modalId).modal("show");
  }

  closeAnyModal(modalId:any){
    $("#"+modalId).modal("hide");
  }

}
