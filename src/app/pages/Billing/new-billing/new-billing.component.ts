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
    // @ViewChild('content')
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
    constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
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
    labels:any;

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
        this.GetBillingdetails();
        this.getLanguage();
    }

    getLanguage() {
        this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(data => {
            this.labels = data;
        })
    }




    selectedDate(data) {

        this.startdate = data[0].toLocaleString().split(',')[0];
        this.enddate = data[1].toLocaleString().split(',')[0];

    }


    //my code

    public GetBillingdetails() {
        debugger
        this.docservice.GetAllProviderSubscriptions(this.languageid, this.year, this.month, this.typeid).subscribe(data => {
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

    pincode: any;
    phoneNo: any;
    monthName: any;
    public GetList(invlist) {
        ;
        this.hospitalname = invlist.providerName;
        this.userid = invlist.id;
        this.phoneNo = invlist.phoneNo
        this.monthlysub = invlist.monthlySubscription;
        this.appointmentperc = invlist.appointmentpercentageamount;
        this.address = invlist.address;
        this.emailid = invlist.emailID;
        this.pincode = invlist.pincode;
        this.totalamount = Number(invlist.monthlySubscription)
        this.invoicenumber = Math.floor(100000 + Math.random() * 900000);
        this.monthName = invlist.name



    }





//     public SavePDF() {

//         this.spinner.show();


//         // parentdiv is the html element which has to be converted to PDF
//         html2canvas(document.querySelector("#content")).then(canvas => {
// debugger
//             var pdf = new jsPDF('p', 'pt', [800, canvas.height]);
//             debugger
//             var imgData = canvas.toDataURL("image/jpeg", 1.0);
//             pdf.addImage(imgData, 0, 0, 800, canvas.height);

//             var pdf1 = pdf.output('blob');
//             var file = new File([pdf1], this.hospitalname + this.year + this.monthName + ".pdf");

//             let body = new FormData();
//             debugger
//             body.append('Dan', file);

//             this.docservice.UploadInvoicePDF(file).subscribe(res => {
//                 ;

//                 this.invoiceurl = res;

//                 this.InsertDetailes();
//             });

//             // pdf.save('PO.pdf');

//         });

//     }


    public SavePDF() {
        ;
this.spinner.show()
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
            Type: this.typeid,
            UserID: this.userid,
            InvoiceUrl: this.invoiceurl,
            InvoiceAmount: this.totalamount,
            Year: this.year,
            Month: this.month
        }
        this.docservice.InsertSentInvoice(entity).subscribe(data => {
            ;
            if (data != undefined) {
                this.spinner.hide()
                Swal.fire("Invoice Send Successfully");
                this.GetBillingdetails()
                // this.GetBillingdetails(this.type, this.startdate, this.enddate);
            }
        })
    }



}
