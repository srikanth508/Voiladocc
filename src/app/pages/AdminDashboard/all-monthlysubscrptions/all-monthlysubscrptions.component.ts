import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-all-monthlysubscrptions',
  templateUrl: './all-monthlysubscrptions.component.html',
  styleUrls: ['./all-monthlysubscrptions.component.css']
})
export class AllMonthlysubscrptionsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  languageid: any;
  id: any;
  labels: any;
  typeid: any;
  hospitalid: any;
  AllDetails: any;
  count: any;
  term: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  todaydate: any;
  startdate: any;
  enddate: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    var date = new Date();
    debugger
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    debugger
    this.startdate = formatDate(firstDay, format, locale);
    this.enddate = formatDate(lastDay, format, locale);
    this.GetAllProviderReports()


    this.getlanguage();
  }


  public GetAllProviderReports() {
    debugger
    this.docservice.GetAllProvidersMontlySubscriptions(this.languageid).subscribe(
      data => {
        debugger
        this.AllDetails = data;
        this.count = this.AllDetails.length;
      }, error => {
      }
    )
  }


  
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
}
