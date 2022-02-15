import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-finance-admin-reports',
  templateUrl: './finance-admin-reports.component.html',
  styleUrls: ['./finance-admin-reports.component.css']
})
export class FinanceAdminReportsComponent implements OnInit {


  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  year: any;
  Month: any;
  typeid: any;
  filterid: any;
  languageid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      this.year = params['year'];
      this.Month = params['Month'];
      this.typeid = params['typeid'];
      this.filterid = params['filterid'];
      this.getsentInvoice()

    }
    )
  }
  reportList: any;

  getsentInvoice() {
    debugger
    this.docservice.GetSentInvoice(this.typeid, this.year, this.Month, this.languageid).subscribe(data => {
      // this.reportList = data;
      debugger
      if (this.filterid == 1) {
        this.reportList = data.filter(x => x.paid == 0 && x.type == this.typeid)
      }
      if (this.filterid == 2) {
        this.reportList = data.filter(x => x.paid == 1 && x.type == this.typeid)
      }
      if (this.filterid == 3) {
        this.reportList = data.filter(x => x.paid == 1 && x.type == this.typeid)
      }
      if (this.filterid == 4) {
        this.reportList = data.filter(x => x.paid == 0 && x.type == this.typeid)
      }
    })

  }

  openInvoice(invoice)
  {
    window.open(invoice,"_blank")
  }

}
