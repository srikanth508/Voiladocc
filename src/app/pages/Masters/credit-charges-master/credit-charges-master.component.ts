import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-credit-charges-master',
  templateUrl: './credit-charges-master.component.html',
  styleUrls: ['./credit-charges-master.component.css']
})
export class CreditChargesMasterComponent implements OnInit {
  term: any;
  constructor(public docservice: HelloDoctorService) { }
  languageid: any;
  creditChargesList: any;
  labels:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getCreditCardChargesMaster();
    this.getlanguage()
  }

  
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }



  getCreditCardChargesMaster() {
    this.docservice.GetCreditCardChargesMaster(this.languageid).subscribe(data => {
      this.creditChargesList = data;
    })
  }
  id: any;
  charges: any;
  getid(id) {
    this.id = id;
  }


  update() {
    this.docservice.UpdateCreditCardChargesMaster(this.id, this.charges).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
      }
      else {
        Swal.fire('Mis à jour avec succés');
      }
      this.getCreditCardChargesMaster();
    })
  }
}
