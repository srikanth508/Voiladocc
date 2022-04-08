import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doc-recp-profile',
  templateUrl: './doc-recp-profile.component.html',
  styleUrls: ['./doc-recp-profile.component.css']
})
export class DocRecpProfileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public username: any;
  public password: any;
  public hospitalclinicid: any;
  languageID: any;
  name: any;
  phoneno: any;
  email: any;
  labels: any;
  address: any;
  doctorid: any;
  dummrecplogins: any;
  receptionistlogins: any;
  count: any;
  recpid: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
    this.recpid = localStorage.getItem('recpid');
    this.getlanguage()


    this.docservice.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
      data => {
        this.dummrecplogins = data;
        var list = this.dummrecplogins.filter(x => x.id == this.recpid);
        this.name=list[0].name,
        this.phoneno=list[0].mobileNo,
        this.email=list[0].email,
        this.address=list[0].address
      
      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }
}
