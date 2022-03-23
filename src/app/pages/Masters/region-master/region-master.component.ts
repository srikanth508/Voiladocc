import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})
export class RegionMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public countrylist: any;
  public countryid: any;
  public cityname: any;
  public showbit: any;
  public id: any;
  public provincelist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     
      this.getprobincelist();
      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.countryid = 0;
    this.getlanguage();
    this.GetCountryMaster()
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }



  public getprobincelist() {
    this.docservice.GetRegionMasterWebDash(this.languageid).subscribe(
      data => {
       
        this.provincelist = data;
        var list = this.provincelist.filter(x => x.id == this.id)
        this.countryid = list[0].countryID,
          this.cityname = list[0].regionName
      }, error => {
      }
    )
  }


  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;
      }, error => {
      }
    )
  }
  public GetCountryID(even) {
   
    this.countryid = even.target.value;
  }


  public insertdetails() {
    if(this.countryid==0||this.countryid==undefined)
    {
      Swal.fire("Please Select Country")
    }
    else{
      this.spinner.show();
      var entity = {
        'CountryID': this.countryid,
        'RegionName': this.cityname
      }
      this.docservice.InsertRegionMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/RegionDash"
        }
      })
    }
  }


  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'CountryID': this.countryid,
      'RegionName': this.cityname
    }
    this.docservice.UpdateRegionMaster(entity).subscribe(data => {
    let res=data;
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/RegionDash"
      
    })
  }
}
