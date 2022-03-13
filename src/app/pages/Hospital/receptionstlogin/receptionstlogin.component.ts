import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-receptionstlogin',
  templateUrl: './receptionstlogin.component.html',
  styleUrls: ['./receptionstlogin.component.css']
})
export class ReceptionstloginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public username: any;
  public password: any;
  public hospitalclinicid: any;
  languageID: any;
  name: any;
  phoneno: any;
  email: any;
  labels: any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }



  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    var entity = {
      'HospitalID': this.hospitalclinicid,
      'UserName': this.username,
      'Password': this.password,
      'Name': this.name,
      'Email': this.email,
      'PhoneNo': this.phoneno
    }
    this.docservice.InsertReceiptionistLogin(entity).subscribe(data => {

      if (data != 0) {
        this.pinno = data;
        // Swal.fire('Added Successfully.');
        if (this.languageID == 1) {
          this.sendmail()
          Swal.fire('Completed', 'Receptionist saved successfully', 'success');
          location.href = "#/ReceptionstloginDash"
        }
        else {
          this.sendmail()
          Swal.fire('', 'Mis à jour avec succés', 'success');
          location.href = "#/ReceptionstloginDash"
        }
      }
      else {
        Swal.fire('Completed', 'User Name already exists', 'success');
        location.href = "#/ReceptionstloginDash"
      }

    })
  }



  pinno: any;
  emailattchementurl = [];

  public sendmail() {
    if (this.languageID == 1) {
      var subject = "Welcome to Voiladoc"
      var desc = 'Dear ' + this.name + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Please do not share the login credentials with anyone and regularly change it to prevent from any unauthorized persons to get access to patient data. Please feel free to contact our customer support at +212522446145 or email them us at support@voiladoc.ma' + "<br><br>" + 'Regards,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.ma'
    }
    else{
      var subject = "Welcome to Voiladoc"
      var desc = 'Dear ' + this.name + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion.' + "<br><br>" + 'Lien web Voiladoc pro : https://maroc.voiladoc.org/' + "<br>" + 'Code PIN : ' + this.pinno + "<br>" + "Nom d'utilisateur : "+ this.username + "<br>" + 'Mot de passe : ' + this.password + "<br><br>" + 'Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma' + "<br><br>" + 'Meilleures salutations,,' + "<br>" + 'Team Voiladoc' + "<br>" + 'www.voiladoc.ma'
    }

    var entity = {
      'emailto': this.email,
      'emailsubject': subject,
      'emailbody': desc,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}
