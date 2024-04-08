import { Component, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { Constant } from 'src/app/constant/Constant';
import { CommonFunction } from 'src/app/shared/CommonFunction';

@Component({
  selector: 'app-smslog',
  templateUrl: './smslog.component.html',
  styleUrls: ['./smslog.component.scss']
})
export class SmslogComponent {
  @ViewChild(PaginationComponent) myPagination: any;
  smsLogList:any = [];
  searchDataList:any = [];

  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent,){
      layout.setPageTitle("SMS Log")
  }

  ngOnInit(): void {
    this.getSmsLog();
  }

  getSmsLog(){
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"smslog"
    }
    this.sharedService.getAllList(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        this.smsLogList = result;
        this.searchDataList = this.smsLogList;
        this.layout.spinnerHide();

        this.searchSmsLog("");
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getSmsLog"))
        this.layout.spinnerHide();
      }
    })
  }

  searchSmsId:any = "";
  searchMessage:any = "";
  searchLocation:any = "";
  searchSendTo:any = "";
  searchDate:any = "";
  searchSmsLog(evt:any){
    this.searchDataList = this.smsLogList.filter
    (
      (x: 
        { 
          sms_id: any;
          message: any;
          location:any;
          sent_to:any;
          date:any;
        }
      ) => 
      x.sms_id.includes(this.searchSmsId) && 
      x.message.toLowerCase().includes(this.searchMessage.toLowerCase()) && 
      x.location.toLowerCase().includes(this.searchLocation.toLowerCase()) && 
      x.sent_to.toLowerCase().includes(this.searchSendTo.toLowerCase()) && 
      x.date.toLowerCase().includes(this.searchDate.toLowerCase())
    );
    this.myPagination.itemCount = this.searchDataList.length;
    this.myPagination.createPagination();
  }

  exportData(){
    if(this.searchDataList.length != 0 ){
      let columnKeyArr:any = ["sms_id","message","location","sent_to","date"];
      let columnTitleArr:any = ["Sms Id","WID","Location","Sent To","Date"];
      CommonFunction.downloadFile(this.searchDataList,
        'SMS Log.csv', 
        columnKeyArr, 
        columnTitleArr)
    }
    else{
      alert("No data for export");
    }
  }

}
