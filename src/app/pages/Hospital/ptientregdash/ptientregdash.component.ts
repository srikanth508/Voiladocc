import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";

@Component({
  selector: 'app-ptientregdash',
  templateUrl: './ptientregdash.component.html',
  styleUrls: ['./ptientregdash.component.css']
})
export class PtientregdashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public patientslist: any;
  public search: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public countrylist: any;
  public dummlist: any;
  public count: any;
  public hospitalid: any;
  doctorid: any;
  recpid: any;
  showback:any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.doctorid = localStorage.getItem('userid');
    this.recpid = localStorage.getItem('recpid');
  
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.hospitalid = localStorage.getItem('hospitalid');

    var kkk = this.SDate.setDate(this.SDate.getDate() - 30);
    var lll = this.EDate.setDate(this.EDate.getDate() + 30);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.languageid = localStorage.getItem("LanguageID");
    this.roleid = localStorage.getItem("roleid");
    this.getlanguage();
    this.Getregisterdpatients();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }
  roleid
  public Getregisterdpatients() {
    if (this.recpid == undefined) {
      this.docservice.GetBookAppointmentByHospitalPatients(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {

          this.patientslist = data;
          this.dummlist = this.patientslist
          this.count = this.patientslist.length
          console.log(this.patientslist)
        },
        error => { }
      );
    }
    else {
      this.docservice.GetBookAppointmentByHospitalPatients(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {

          this.dummlist = data;
          this.patientslist = this.dummlist.filter(x => x.doctorID == this.doctorid)
          console.log(this.patientslist)
          this.count = this.patientslist.length
        },
        error => { }
      );
    }

  }

  public deletepatient(id) {

    this.docservice.DeletePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Disabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }
  public Enablepatient(id) {

    this.docservice.EnablePatientRegistration(id).subscribe(data => {
      if (data != undefined || data != null) {
        Swal.fire("Enabled Successfully");
        this.getlanguage();
        this.Getregisterdpatients();
      }
    });
  }

  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.Getregisterdpatients();
  }
}
