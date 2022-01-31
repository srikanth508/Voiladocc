import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-diagnostic-support-dash',
  templateUrl: './diagnostic-support-dash.component.html',
  styleUrls: ['./diagnostic-support-dash.component.css']
})
export class DiagnosticSupportDashComponent implements OnInit {

  options: NgDateRangePickerOptions;
  languageid: any;
  issuelist: any;
  labels: any;

  term: any;
  dummissuelist: any;
  constructor(public docservice: HelloDoctorService) { }
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public count: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  pharmacyid: any;
  public diagnosticid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.diagnosticid = localStorage.getItem('diagnosticid');

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

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
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }



  public GetSupportIssues() {
    this.docservice.GetSupportForWeb(this.languageid, this.diagnosticid, 8, this.startdate, this.enddate).subscribe(res => {
     
      this.dummissuelist = res;
      this.issuelist =res;
      //  this.dummissuelist.filter(x => x.resolved == 0)
      // 
      this.count = this.issuelist.length;
     
    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
     
      this.labels = res;
     
    })
  }

  selectedDate(data) {
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetSupportIssues()
  }


  photourl: any;

  public GetImageUrl(photoURL) {
   
    this.photourl = photoURL
  }

  
public getglmasterexcel() {
  let hhh = this.tableToJson(document.getElementById('Appointment'));
  this.exportAsExcelFile(hhh, "Support Reports");
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
    for (var j = 0; j < tableRow.cells.length - 2; j++) {
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

public resolvephotourl:any;

public GetResolvePhotoUrl(resolveDescription) {
  this.resolvephotourl = resolveDescription
}
}
