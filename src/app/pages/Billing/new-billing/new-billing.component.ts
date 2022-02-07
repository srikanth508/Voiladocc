import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
    selector: 'app-new-billing',
    templateUrl: './new-billing.component.html',
    styleUrls: ['./new-billing.component.css']
})
export class NewBillingComponent implements OnInit {
    billinglist: any;
    invoicelist: any;
    totalamount: any;
    @ViewChild('content')
    content: ElementRef;
    invoiceurl: any;
    type: any;
    hospitalname: any;
    contractsdate: any;
    contractedate: any;
    monthlysub: any;
    appointmentperc: any;
    address: any;
    userid: any;
    yearlysub: any;
    emailid: any;
    constructor(public docservice: HelloDoctorService,private spinner: NgxSpinnerService) { }
    languageid: any;
    value: any;
    SDate = new Date();
    EDate = new Date();
    startdate: any;
    enddate: any;
    public todaydate: any;
    roleid: any;
    invoicenumber: any;
    blob: any;
    options: NgDateRangePickerOptions;
    typeid: any;

    ngOnInit() {
        ;

        this.roleid = localStorage.getItem('roleid');
        const format = 'yyyy-MM-dd';
        const myDate = new Date();
        const locale = 'en-US';
        this.todaydate = formatDate(myDate, format, locale);
        this.languageid = localStorage.getItem('LanguageID');
        var date = new Date();
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
        this.typeid = 1
        this.GetBillingdetails()
    }






    selectedDate(data) {

        this.startdate = data[0].toLocaleString().split(',')[0];
        this.enddate = data[1].toLocaleString().split(',')[0];

    }


    //my code

    public GetBillingdetails() {
        debugger
        this.docservice.GetAllProviderSubscriptions(this.languageid,this.year,this.month,this.typeid).subscribe(data => {
            debugger
            this.billinglist = data;
            this.spinner.hide()
        })
    }

    year: any;
    public GetYear(even) {
        // this.spinner.show();
        this.year = even.target.value;
        this.spinner.show();
        this.GetBillingdetails()
    }

    month: any;
    public GetMonth(even) {
        // this.spinner.show();
        this.month = even.target.value;
        this.spinner.show();
        this.GetBillingdetails()
    }


    GetType(even) {
        this.typeid = even.target.value;
        this.spinner.show();
        this.GetBillingdetails()
    }




    // public GetBillingdetails(TypeID, SDATE, EDATE) {

    //     this.docservice.GetHospitalClinicBillingDetails(TypeID, SDATE, EDATE).subscribe(data => {

    //         this.billinglist = data;
    //     })
    // }

    public GetList(invlist) {
        ;
        this.hospitalname = invlist.providerName;
        this.userid = invlist.id;
        // this.contractsdate = invlist.contractStartdate;
        // this.contractedate = invlist.contractEnddate;
        this.monthlysub = invlist.monthlySubscription;
        this.appointmentperc = invlist.appointmentpercentageamount;
        this.address = invlist.address;
        this.emailid = invlist.emailID;
        this.totalamount = Number(invlist.monthlySubscription)
        //  + Number(invlist.appointmentpercentageamount);
        this.invoicenumber = Math.floor(100000 + Math.random() * 900000);

    }
    public SavePDF() {
        ;

        let pdfContent = window.document.getElementById("content");
        var doc = new jsPDF('p', 'mm', "a4");

        html2canvas(pdfContent).then(canvas => {
            ;
            var imgData = canvas.toDataURL('image/jpeg', 1.0);

            doc.setFontSize(3);

            doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
            var pdf = doc.output('blob');

            var file = new File([pdf], "Invoice" + ".pdf");

            let body = new FormData();

            body.append('Dan', file);

            this.docservice.UploadInvoicePDF(file).subscribe(res => {
                ;

                this.invoiceurl = res;

                this.InsertDetailes();
            });
        });

    }



    public UploadPdf(data) {
        this.docservice.UploadInvoicePDF(data).subscribe(res => {
            ;
            Swal.fire("Added Successfully");
        });
    }

    public InsertDetailes() {
        var entity = {
            Type: this.type,
            UserID: this.userid,
            InvoiceUrl: this.invoiceurl,
            HospitalName: this.hospitalname,
            filename: this.invoiceurl,
            ContractStartDate: this.contractsdate,
            ContractEndDate: this.contractedate,
            PaidAmount: this.totalamount,
            EmailID: this.emailid
        }
        this.docservice.InsertSentInvoice(entity).subscribe(data => {
            ;
            if (data != undefined) {

                Swal.fire("Invoice Send Successfully");
                // this.GetBillingdetails(this.type, this.startdate, this.enddate);
            }
        })
    }



}
