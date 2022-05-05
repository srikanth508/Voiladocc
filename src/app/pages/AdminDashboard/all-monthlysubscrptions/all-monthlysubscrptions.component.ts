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
   

    this.getlanguage();

    this.typeid = localStorage.getItem('TypeID');
    this.GetAllProviderReports()

  }

  dummAlldetails: any;
  public GetAllProviderReports() {
    debugger
    this.docservice.GetAllProvidersMontlySubscriptions(this.languageid).subscribe(
      data => {
        debugger
        // this.AllDetails = data;
        this.dummAlldetails = data;

        this.AllDetails = this.dummAlldetails.filter(x => x.typeid == this.typeid)
        this.count = this.AllDetails.length;
      }, error => {
      }
    )
  }

  GettypeID(even) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.AllDetails = this.dummAlldetails.filter(x => x.typeid == this.typeid)
    }
    else {
      this.GetAllProviderReports();
    }
  }




  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('AppoitmentReports'));
    this.exportAsExcelFile(hhh, "Cancelled Appointments");
  }

  public tableToJson(table) {

    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
