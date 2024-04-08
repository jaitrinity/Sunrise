import { Component, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { Constant } from 'src/app/constant/Constant';
declare var $: any;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @ViewChild(PaginationComponent) myPagination: any;
  wid:any = "";
  template:any = "";
  templateName:any = "";
  dataList:any = [];
  searchDataList:any = [];

  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent,){
      layout.setPageTitle("Message")
  }

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage(){
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"messages"
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
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getMessage"))
        this.layout.spinnerHide();
      }
    })
  }

  saveWid(){
    let jsonData = {
      insertType: "wid",
      wid:this.wid,
      templateName:this.templateName,
      template:this.template
    }
    this.sharedService.insertData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.closeAnyModal('widModal');
          $(".resetField").val("");
          // this.getMessage();
          this.layout.successSnackBar(result.message);
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("WID"))
      }
    })
  }

  exportData(){

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
