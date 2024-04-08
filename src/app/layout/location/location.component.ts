import { Component, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/SharedService';
import { LayoutComponent } from '../layout.component';
import { take } from 'rxjs';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { Constant } from 'src/app/constant/Constant';
import { CommonFunction } from 'src/app/shared/CommonFunction';
declare var $: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @ViewChild(PaginationComponent) myPagination: any;
  mobile: any="";
  location: any="";
  password: any="";
  locationList:any = [];
  searchDataList:any = [];
  constructor(private sharedService: SharedService, 
    private layout: LayoutComponent,){
      layout.setPageTitle("Location")
  }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(){
    this.layout.spinnerShow();
    let jsonData = {
      searchType:"location"
    }
    this.sharedService.getAllList(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        this.locationList = result;
        this.searchDataList = this.locationList;
        this.layout.spinnerHide();

        this.searchLocation("");
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("getLocation"))
        this.layout.spinnerHide();
      }
    })
  }

  searchVid:any = "";
  searchMobileNo:any = "";
  searchLocName:any = "";
  searchPassword:any = "";
  searchLocation(evt:any){
    this.searchDataList = this.locationList.filter
    (
      (x: 
        { 
          v_id: any;
          mobile_no: any;
          location:any;
          password:any
        }
      ) => 
      x.v_id.includes(this.searchVid) && 
      x.mobile_no.toLowerCase().includes(this.searchMobileNo.toLowerCase()) && 
      x.location.toLowerCase().includes(this.searchLocName.toLowerCase()) && 
      x.password.toLowerCase().includes(this.searchPassword.toLowerCase())
    );
    this.myPagination.itemCount = this.searchDataList.length;
    this.myPagination.createPagination();
  }

  exportLocation(){
    if(this.searchDataList.length != 0 ){
      let columnKeyArr:any = ["v_id","mobile_no","location","password"];
      let columnTitleArr:any = ["V Id","Mobile No","Location","Password"];
      CommonFunction.downloadFile(this.searchDataList,
        'Location.csv', 
        columnKeyArr, 
        columnTitleArr)
    }
    else{
      alert("No data for export");
    }
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

  saveLocation(){
    if(this.mobile == ""){
      this.layout.warningSnackBar("Please enter mobile");
      return;
    }
    else if(this.mobile.length != 10){
      this.layout.warningSnackBar("Please enter valid mobile number with 10 digit");
      return;
    }
    else if(this.location == ""){
      this.layout.warningSnackBar("Please enter location");
      return;
    }
    else if(this.password == ""){
      this.layout.warningSnackBar("Please enter password");
      return;
    }
    let jsonData = {
      insertType: "location",
      mobile: this.mobile,
      location: this.location,
      password: this.password
    }
    this.sharedService.insertData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.closeAnyModal('locationModal');
          $(".resetField").val("");
          this.getLocation();
          this.layout.successSnackBar(result.message);
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("location"))
      }
    })
  }

  editLocation(dataObj:any){
    let v_id = dataObj.v_id;
    $(".nonEdit"+v_id).hide();
    $(".edit"+v_id).show();
  }

  submitLocation(dataObj:any){
    let v_id = dataObj.v_id;
    let mobile = $("#mob"+v_id).val();
    let location = $("#loc"+v_id).val();
    let password = $("#pass"+v_id).val();

    let jsonData = {
      updateType: "location",
      v_id: v_id,
      mobile: mobile,
      location: location,
      password: password
    }
    this.sharedService.updateData(jsonData)
    .pipe(take(1)).subscribe({
      next: result=>{
        if(result.code == Constant.SUCCESSFUL_STATUS_CODE){
          this.layout.successSnackBar(result.message);
          // this.getLocation();
          dataObj.mobile_no = mobile;
          dataObj.location = location;
          dataObj.password = password;
          this.cancelLocation(dataObj);
        }
        else{
          this.layout.warningSnackBar(result.message);
        }
      },
      error: _=>{
        this.layout.errorSnackBar(Constant.returnServerErrorMessage("location"))
      }
    })

  }

  cancelLocation(dataObj:any){
    let v_id = dataObj.v_id;
    $("#mob"+v_id).val(dataObj.mobile_no);
    $("#loc"+v_id).val(dataObj.location);
    $("#pass"+v_id).val(dataObj.password);
    
    $(".edit"+v_id).hide();
    $(".nonEdit"+v_id).show();
  }

  

  

}
