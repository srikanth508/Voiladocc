import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-region-dash',
  templateUrl: './region-dash.component.html',
  styleUrls: ['./region-dash.component.css']
})
export class RegionDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels:any;
  public languageid:any;
  public countrylist:any;
  public term:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetCountryMaster();
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public GetCountryMaster() {
    this.docservice.GetRegionMasterWebDash(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;
      }, error => {
      }
    )
  }


  public DeleteCountryMaster(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Country!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteRegionMaster(id).subscribe(res => {
          let test = res;
          this.GetCountryMaster();
        })
        Swal.fire(
          'Deleted!',
          'Country has been deleted.',
          'success'
        )
      }
      else {
        this.GetCountryMaster();
      }
    })
  }
}
