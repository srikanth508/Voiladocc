import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mid-wife-admin-reports',
  templateUrl: './mid-wife-admin-reports.component.html',
  styleUrls: ['./mid-wife-admin-reports.component.css']
})
export class MidWifeAdminReportsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public languageid: any;
  public labels: any;
  public startdate: any;
  public enddate: any;
  public reports:any;
  public count:any;
  public term:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.startdate = localStorage.getItem('StartTime');
    this.enddate = localStorage.getItem('EndDate')
    this.getlanguage();
    this.getmidwifereport();
  }

  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getmidwifereport() {
    this.docservice.GetBook_Book_Midwives_AppointmentForWebAdminReports(this.startdate,this.enddate,this.languageid).subscribe(
      data => {
       
        this.reports = data;
        this.count= this.reports.length
      }, error => {
      }
    )
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('MidWife'));
    this.exportAsExcelFile(hhh, "Appointment Reports");
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
