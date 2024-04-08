import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { Constant } from 'src/app/constant/Constant';
import { CommonFunction } from 'src/app/shared/CommonFunction';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
declare var $: any;

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
  @ViewChild(PaginationComponent) myPagination: any;
  wid:any = "";
  // template:any = "";
  templateName:any = "";
  dataList:any = [];
  searchDataList:any = [];

  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent,){
      layout.setPageTitle("WID")
  }

  ngOnInit(): void {
    this.getWid();
  }

  getWid(){
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"wid"
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

  saveWid(){
    if(this.wid == ""){
      this.layout.warningSnackBar("Please enter WID");
      return;
    }
    else if(this.templateName == ""){
      this.layout.warningSnackBar("Please enter Template Name");
      return;
    }
    // else if(this.template == ""){
    //   this.layout.warningSnackBar("Please enter Template");
    //   return;
    // }
    let jsonData = {
      insertType: "wid",
      wid:this.wid,
      templateName:this.templateName
      // template:this.template
    }
    this.sharedService.insertData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.layout.successSnackBar(result.message);
          this.closeAnyModal('widModal');
          $(".resetField").val("");
          this.dataList = [];
          this.searchDataList = this.dataList;
          this.getWid();
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("saveWID"))
      }
    })
  }

  exportData(){
    if(this.searchDataList.length != 0 ){
      // let columnKeyArr:any = ["wid","templateName","template",];
      let columnKeyArr:any = ["wid","templateName"];
      // let columnTitleArr:any = ["WID","Template Name","template"];
      let columnTitleArr:any = ["WID","Template Name"];
      CommonFunction.downloadFile(this.searchDataList,
        'WID.csv', 
        columnKeyArr, 
        columnTitleArr)
    }
    else{
      alert("No data for export");
    }
  }

  editWid(dataObj:any){
    let wid = dataObj.wid;
    $(".nonEdit"+wid).hide();
    $(".edit"+wid).show();
  }
  submitWid(dataObj:any){
    let wid = dataObj.wid;
    let template = $("#template"+wid).val();

    let jsonData = {
      updateType: "wid",
      wid: wid,
      template: template
    }
    this.sharedService.updateData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.layout.successSnackBar(result.message);
          // this.getLocation();
          dataObj.template = template;
          this.cancelWid(dataObj);
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("submitWid"))
      }
    })
  }
  cancelWid(dataObj:any){
    let wid = dataObj.wid;
    $("#template"+wid).val(dataObj.template);
    
    $(".edit"+wid).hide();
    $(".nonEdit"+wid).show();
  }

  changeStatus(dataObj:any, status:any){
    let wid = dataObj.wid;
    let statusTxt = status == 1 ? "Approved" : "Pending";
    let isConfirm = confirm("Do you want to "+statusTxt+" "+wid+" WID? ");
    if(!isConfirm){
      return;
    }

    let jsonData = {
      updateType: "widStatus",
      wid: wid,
      status: status
    }
    this.sharedService.updateData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.layout.successSnackBar(result.message);
          // this.getLocation();
          dataObj.statusTxt = statusTxt;
          dataObj.status = status;
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("submitWid"))
      }
    })
  }

  searchWid: any ="";
  searchWhatsappId(evt:any){
    this.searchDataList = this.dataList.filter
    (
      (x: 
        { 
          wid: any;
        }
      ) => 
      x.wid.toLowerCase().includes(this.searchWid.toLowerCase())
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
