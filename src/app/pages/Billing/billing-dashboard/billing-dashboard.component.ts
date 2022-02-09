import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: 'app-billing-dashboard',
    templateUrl: './billing-dashboard.component.html',
    styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {
    type: any;
    year: any;
    month: any;
    dummylist: any;
    sentinvoicecount: any;
    paidinvoicecount: any;
    pendinginvoicecount: any;
    pendinginvoice: any;
    paidinvoice: any;
    paidamount: any;
    pendingamount: any;
    constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
    todaydate: any;
    languageid: any;
    typeid: any;
    ngOnInit() {
        this.spinner.show()
        const format = 'yyyy-MM-dd';
        const myDate = new Date();
        const locale = 'en-US';
        this.todaydate = formatDate(myDate, format, locale);
        this.languageid = localStorage.getItem('LanguageID');
        var date = new Date();
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
        this.typeid = 1
        this.GetCounts()
    }
    counts: any;
    public GetCounts() {
        debugger
        this.docservice.GetSendivoicesCount(this.languageid, this.typeid, this.year, this.month).subscribe(data => {
            console.log("All Counts", this.counts);
            this.counts = data;
            this.spinner.hide()
        })
    }
    public GetType(even) {
        this.spinner.show()
        this.typeid = even.target.value;
        this.GetCounts();

    }
    public GetYear(even) {
        this.spinner.show()
        this.year = even.target.value;
        this.GetCounts();

    }
    public GetMonth(even) {
        this.spinner.show()
        this.month = even.target.value;
        this.GetCounts();
    }



    gotoReports(value) {
        location.href = "#/FinanceAdminReports/" + this.year + "/" + this.month + "/" + this.typeid + "/" + value
    }
}
