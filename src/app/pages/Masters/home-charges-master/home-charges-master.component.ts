import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-charges-master',
  templateUrl: './home-charges-master.component.html',
  styleUrls: ['./home-charges-master.component.css']
})
export class HomeChargesMasterComponent implements OnInit {
  languageid: any;
  constructor(public docservice: HelloDoctorService) { }
  homeChargesList: any;
  term: any;
  labels:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getHomeChargesMaster();
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


  getHomeChargesMaster() {
    this.docservice.GetHomeCountryVisitDeliveryChargesMaster(this.languageid).subscribe(data => {
      this.homeChargesList = data;
    })
  }


  id: any;

  getid(credit) {
    this.id = credit.id
    this.deliverycharges=credit.deliveryCharges;
    this.meridionalcommission=credit.meridionalCommision;
    this.deliveryPatnerFees=credit.deliveryPatnerFees
  }



  deliverycharges: any;
  meridionalcommission: any;
  deliveryPatnerFees: any;



  public GetCommission(even) {
    debugger
    if (even > this.deliverycharges) {

      this.meridionalcommission = 0;
      this.deliveryPatnerFees = 0
    }
    else {
      debugger
      this.deliveryPatnerFees = Number(this.deliverycharges) - Number(this.meridionalcommission);
    }
  }



  public update() {
    debugger
    var entity = {
      'ID': this.id,
      'DeliveryCharges': this.deliverycharges,
      'MeridionalCommision': this.meridionalcommission,
      'DeliveryPatnerFees': this.deliveryPatnerFees
    }
    this.docservice.UpdateHomeCountryVisitDeliveryChargesMaster(entity).subscribe(data => {
      debugger
      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
        this.getHomeChargesMaster()
        document.getElementById("close").click();
      }
      else {
        Swal.fire("Ajouté avec succès");
        this.getHomeChargesMaster()
        document.getElementById("close").click();
      }

    })
  }



}
