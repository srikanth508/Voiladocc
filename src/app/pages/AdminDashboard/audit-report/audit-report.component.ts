import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  term: any;
  auditReportList: any;
  dummauditReportList: any;
  todaydate:any;
  startdate:any;
  enddate:any;
  value:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
  
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    this.startdate = formatDate(firstDay, format, locale);
    this.enddate = formatDate(lastDay, format, locale);

    this.GetProvidersAuditReport()

  }

  GetProvidersAuditReport() {
    this.docservice.GetProvidersAuditReport(1,this.startdate,this.enddate).subscribe(async data => {
      this.auditReportList = data;
      this.dummauditReportList = data;
    })
  }
  typeid: any;

  gettypeID(even) {
    this.typeid = even.target.value;
    if (this.typeid != 0) {
      this.auditReportList = this.dummauditReportList.filter(x => x.typeID == this.typeid)
    }
    else {
      this.GetProvidersAuditReport();
    }
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Report'));
    this.exportAsExcelFile(hhh, "Audit Report");
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
      for (var j = 0; j < tableRow.cells.length; j++) {
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



  selectedDate(data) {
    this.startdate = this.docservice.GetDates(data[0]);
    this.enddate = this.docservice.GetDates(data[1]);
    this.GetProvidersAuditReport()
  }

}
