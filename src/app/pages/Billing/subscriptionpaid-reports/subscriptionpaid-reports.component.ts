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
  selector: 'app-subscriptionpaid-reports',
  templateUrl: './subscriptionpaid-reports.component.html',
  styleUrls: ['./subscriptionpaid-reports.component.css']
})
export class SubscriptionpaidReportsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  year: any;
  Month: any;
  typeid: any;
  filterid: any;
  languageid: any;
  reportList: any;
  todaydate; any;
  dropzonelable: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = localStorage.getItem('LanguageID');
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.typeid = 1
    this.getsentInvoice()

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.getLanguage();
  }
  labels:any;

  getLanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(data => {
        this.labels = data;
    })
}




  getsentInvoice() {
    debugger
    this.docservice.GetSentInvoice(this.typeid, this.year, this.month, this.languageid).subscribe(data => {
      this.reportList = data.filter(x => x.paid == 0);
      this.spinner.hide()
      debugger
    })
  }


  public GetYear(even) {
    this.spinner.show();
    this.year = even.target.value;
    this.spinner.show();
    this.getsentInvoice()
  }

  month: any;
  public GetMonth(even) {
    // this.spinner.show();
    this.month = even.target.value;
    this.spinner.show();
    this.getsentInvoice()
  }


  GetType(even) {
    this.typeid = even.target.value;
    this.spinner.show();
    this.getsentInvoice()
  }

  id: any;

  amountPaid(details) {
    debugger
    this.id = details.id,
      this.paidAmount = details.invoiceAmount
  }





  identityattachmentsurlssss = []
  attachments = []
  attachmentsurl = []
  showidentityproof = []


  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);

      this.identityattachmentsurlssss.push(res);

      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityproof.push(b)
      this.attachments.length = 0;



    })
    // this.sendattachment();
  }
  paidAmount: any;
  comments: any;

  InsertPayments() {
    var entity = {
      'ID': this.id,
      'AttchmentUrl': this.attachmentsurl[0],
      'PaidAmount': this.paidAmount,
      'Comments': this.comments
    }
    this.docservice.UpodateSentInvoice(entity).subscribe(data => {
      Swal.fire("Paid Successfully");
    })
  }
}
