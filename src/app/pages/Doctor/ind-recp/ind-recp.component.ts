import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ind-recp',
  templateUrl: './ind-recp.component.html',
  styleUrls: ['./ind-recp.component.css']
})
export class IndRecpComponent implements OnInit {

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
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageID = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
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
      'DoctorID': this.doctorid,
      'Name': this.name,
      'MobileNo': this.phoneno,
      'Email': this.email,
      'Address': this.address,
      'UserName': this.username,
      'Password': this.password,
    }
    this.docservice.InsertIndependentDoctors_Receptionist(entity).subscribe(data => {

      if (data != 0) {
        this.pinno = data;
        // Swal.fire('Added Successfully.');
        if (this.languageID == 1) {
          this.sendmail()
          Swal.fire('Completed', 'Receptionist saved successfully', 'success');
          location.href = "#/IndRecpdash"
        }
        else {
          this.sendmail()
          Swal.fire('', 'Mis à jour avec succés', 'success');
          location.href = "#/IndRecpdash"
        }
      }
      else {
        Swal.fire('Completed', "Merci de renseigner le numéro d’identité d’un parent ou du tuteur légal si le patient est mineur.");
        // location.href = "#/IndRecpdash"
      }

    })
  }



  pinno: any;
  emailattchementurl = [];

  public sendmail() {
    if (this.languageID == 1) {
      var sub = 'Welcome TO VOiladoc'
      var body = 'Dear ' + this.name + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    else {
      var sub = 'Bienvenue sur Voialdoc'
      var body = 'Cher ' + this.name + ',' + "<br><br>" + 'Merci de vous être inscrit sur Voiladoc. Voici vos identifiants de connexion.' + "<br><br>" + 'Lien web Voiladoc pro https://maroc.voiladoc.org/' + "<br>" + 'Code PIN : ' + this.pinno + "<br>" + "Nom d'utilisateur : " + this.username + "<br>" + 'Mot de passe  : ' + this.password + "<br><br>" + "Veuillez ne pas partager vos identifiants de connexion avec qui que ce soit. Contactez notre ligne d'assistance au +212522446145 ou envoyez-nous un e-mail à support@voiladoc.ma" + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Team Voiladoc' + "<br>" + "www.voiladoc.ma"
    }

    var entity = {
      'emailto': this.email,
      'emailsubject': sub,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
      this.SendTwiliSms();
    })
  }



  smsdesc: any;

  public SendTwiliSms() {

    if (this.languageID == 1) {
      var sub =
        "Welcome to Voiladoc" +
        "Pin code  : " +
        this.pinno +
        "UserName :" +
        this.username +
        "Password : " +
        this.password;
    } else {
      var sub =
        "Bienvenue sur Voialdoc" +
        " Code PIN  : " +
        this.pinno +
        "     Nom dutilisateur :" +
        this.username +
        "     Mot de passe : " +
        this.password;
    }
    debugger
    this.docservice.SendTwillioSMS("212" + this.phoneno, sub).subscribe(data => {

    })
  }

}
