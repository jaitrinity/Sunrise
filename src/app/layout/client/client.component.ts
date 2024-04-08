import { Component, ViewChild } from '@angular/core';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { Constant } from 'src/app/constant/Constant';
import { CommonFunction } from 'src/app/shared/CommonFunction';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  @ViewChild(PaginationComponent) myPagination: any;
  filterFromDate: any = "";
  filterToDate: any = "";
  dataList:any = [];
  searchDataList:any = [];

  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent,){
      layout.setPageTitle("Client")
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(){
    this.dataList = [];
    this.searchDataList = [];
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"client",
      filterFromDate: this.filterFromDate,
      filterToDate: this.filterToDate
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
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getClient"))
        this.layout.spinnerHide();
      }
    })
  }

  exportData(){
    if(this.searchDataList.length != 0 ){
      let columnKeyArr:any = ["cf_id","mobile","name","email","amount","full_name","dob","gender","married","address","location","send_message","date"];
      let columnTitleArr:any = ["Cf id","Mobile","Name","Email","Amount","Full Name","DOB","Gender","Married","Address","Location","Send Message","Date"];
      CommonFunction.downloadFile(this.searchDataList,
        'Client.csv', 
        columnKeyArr, 
        columnTitleArr)
    }
    else{
      alert("No data for export");
    }
  }

}
