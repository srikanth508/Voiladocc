import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-hospital-clinic',
  templateUrl: './edit-hospital-clinic.component.html',
  styleUrls: ['./edit-hospital-clinic.component.css']
})
export class EditHospitalClinicComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  public hospitalid: any;
  public details: any;
  public hospitalname: any;
  public phno: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public address: any;
  public cityid: any;
  public zipcode: any;
  public timings: any;
  public website: any;
  public yearestablished: any;
  public noofbeds: any;
  public description: any;
  public citylist: any;
  public emailid: any;
  public photourl: any;
  public validEmail: any;
  public showdrop: any;
  public id: any;
  public showphoto = [];
  public multiplephotos: any;
  public mulphoto: any;
  public multipleid: any;

  public attachments = [];
  public attachmentsurl = [];
  public arealist: any;
  public pincode: any;
  public areaid: any;
  public mulbit: any;
  public countrylist: any;
  public countryid: any;

  public languageid: any;
  public labels: any;
  public dropzonelable: any;
  public subscriptiontype: any;
  public contractstartdate: any;
  public contractenddate: any;
  date = new Date();

  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  vatCheck: any;
  vatpercentage: any;
  today = new Date()



  ngOnInit() {
    // this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      this.showdrop = 0;
      this.mulbit = 0;
    }
    )
    this.gethospitalclinicdetailsbyid();
    this.GetMultiplePhotos();
    this.GetCountryMaster()
    // this.GetHospitalRevenuesubscriptions()


    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.GetSubscriptionrevenue();


    this.countryid = ""
    this.cityid = ""
    this.areaid = ""

  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }



  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {

    this.countryid = even.target.value;
    this.GetRegionMaster()


  }

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.regionID, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }

  public GetCityID(even) {

    this.cityid = even.target.value;
    this.getareamasterbyid()
  }



  public gethospitalclinicdetailsbyid() {
    this.docservice.GetHospital_ClinicDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.details = data[0];
        console.log("Hospital Data", this.details);

        this.hospitalname = this.details.hospital_ClinicName,
          this.phno = this.details.phoneNo,
          this.contactpersonname = this.details.contactPersonName,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.address = this.details.address,
          this.emailid = this.details.emailID,
          this.regionID = this.details.regionMasterID
        this.cityid = this.details.cityID,
          this.zipcode = this.details.zipCode,
          this.timings = this.details.timings
        this.website = this.details.website,
          this.yearestablished = this.details.yearEstablished,
          this.noofbeds = this.details.noOfBeds,
          this.description = this.details.description,
          this.photourl = this.details.photoURL,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.countryid = this.details.countryID,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.subscriptiontype = this.details.subscriptionTypeID,
          this.monthlysubription = this.details.monthlySubscription
        this.appointmentpercentage = this.details.appointmentPercentage
        this.taxidentification = this.details.taxIdentification
        this.businessid = this.details.businessID
        this.commercialcity = this.details.commercialRegCity
        this.taxprofessional = this.details.taxProfessional

        this.socialseccurityfundno = this.details.socialSeccurityNo
        this.nameofbank = this.details.nameofthebank
        this.accountName = this.details.accountName
        this.accountNumber = this.details.accountNumber,
          this.latitude = this.details.lattitude,
          this.longitude = this.details.longitude,
          this.formatAddress = this.details.formatedAddress,
          this.vatpercentage = this.details.vatPercentage,
          this.contractstartdate = this.details.exonerationPeriodFromDate
        this.contractenddate = this.details.exonerationPeriodFromDate,
          this.vatCheck = this.details.vat
        this.GetCountryMaster();
        this.GetRegionMaster();
        this.getcitymaster();
        this.getareamasterbyid();


      }, error => {
      }
    )
  }


  regionList: any;

  GetRegionMaster() {
    this.docservice.GetRegionMasterWeb(this.countryid).subscribe(
      data => {

        this.regionList = data;


      }, error => {
      }
    )
  }

  regionID: any;

  GetRegionID(even) {
    this.regionID = even.target.value;
    this.getcitymaster()
  }

  geocode() {
    debugger
    this.spinner.show()
    this.docservice.Getlocation(this.address).subscribe(data => {
      debugger
      console.log("google addressmain", data);
      if (data["results"].length != 0) {
        this.googleAddress = data["results"];
        console.log("google address", this.googleAddress)
        debugger
        this.formatAddress = this.googleAddress[0]["formatted_address"];
        this.latitude = this.googleAddress[0].geometry.location["lat"],
          this.longitude = this.googleAddress[0].geometry.location["lng"];
        Swal.fire("Emplacement récupéré avec succès");
        this.spinner.hide();
      }
      else {
        Swal.fire("Entrez l'adresse correcte");
        this.spinner.hide();
      }

    })
  }


  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;



  public updatedetails() {
    debugger
    this.contractstartdate = this.docservice.GetDates(this.contractstartdate)
    this.contractenddate = this.docservice.GetDates(this.contractenddate)
    var entity = {
      'LanguageID': this.languageid,
      'Hospital_ClinicID': this.id,
      'PhoneNo': this.phno,
      'ContactPersonName': this.contactpersonname,
      'ContactPersonPhNo': this.contactpersonphno,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'ZipCode': this.zipcode,
      'Timings': this.timings,
      'Website': this.website,
      'YearEstablished': this.yearestablished,
      'NoOfBeds': this.noofbeds,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'TaxIdentification': this.taxidentification,
      'BusinessID': this.businessid,
      'CommercialRegCity': this.commercialcity,
      'TaxProfessional': this.taxprofessional,
      'SocialSeccurityNo': this.socialseccurityfundno,
      'Nameofthebank': this.nameofbank,
      'AccountName': this.accountName,
      'AccountNumber': this.accountNumber,
      'VAT':this.vatCheck,
      'Lattitude': this.latitude,
      'Longitude': this.longitude,
      'FormatedAddress': this.formatAddress,
      'VatPercentage': this.vatpercentage,
      'ExonerationPeriodFromDate': this.contractstartdate!=null||undefined?this.contractstartdate:new Date(),
      'ExonerationPerioToDate': this.contractenddate!=null||undefined?this.contractstartdate:new Date()
    }
    debugger
    this.docservice.UpdateHospitalClinicProfile(entity).subscribe(res => {
      let test = res;
      this.gethospitalclinicdetailsbyid();
      this.GetMultiplePhotos()
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else {
        Swal.fire(' Mis à jour avec Succés');
      }
      location.href = "#/HspClidash"
    })

  }
  public GetID() {
    this.showdrop = 1;
  }

  public subscriptionslist: any;
  public monthlysubription: any;
  public appointmentpercentage: any;


  // public GetHospitalRevenuesubscriptions() {

  //   this.docservice.GetHospitalClinic_RevenueSubscriptions(this.id).subscribe(data => {
  //     this.subscriptionslist = data;
  //     this.subscriptiontype = this.subscriptionslist[0].subscriptionTypeID,
  //       this.monthlysubription = this.subscriptionslist[0].monthlySubscription,
  //       this.appointmentpercentage = this.subscriptionslist[0].appointmentPercentage,
  //       this.contractstartdate = this.subscriptionslist[0].contractStartdate,
  //       this.contractenddate = this.subscriptionslist[0].contractEnddate
  //   })
  // }


  public subscrilist: any;


  public GetSubscriptionrevenue() {
    this.docservice.GetHospitalClinic_RevenueSubscriptionsByHospitalID(this.id).subscribe(data => {
      this.subscrilist = data;

    })
  }



  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succès');
      abcd.length = 0;
    }


  }

  public uploadattachments() {
    this.docservice.HospitalClinicPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b);

      this.attachments.length = 0;

    })
    // this.sendattachment();
  } s
  public updatephoto() {

    var entity = {
      'ID': this.id,
      'HospitalLogoUrl': this.attachmentsurl[0]
    }
    this.docservice.UpdateHospital_ClinicDetailsMasterPhoto(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else {
        Swal.fire(' Mis à jour avec Succés');
      }
      // Swal.fire(' Updated Successfully');
      this.gethospitalclinicdetailsbyid();
      this.showdrop = 0;
    })
  }
  public GetMultiplePhotos() {

    this.docservice.GetHospital_ClinicPhotosByHospitalclinicID(this.id).
      subscribe(data => {

        this.multiplephotos = data;
        //  this.mulphoto = this.multiplephotos.photoURL
      }, error => {
      })
  }

  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;
      }, error => {
      }
    )
  }
  public GetAreaID(even) {

    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {

        this.pincode = this.arealist[i].pincode
      }
    }
  }
  public GetHospitalID(hospitalid) {

    this.multipleid = hospitalid;
    this.mulbit = 1;
  }


  public UpdateMultiplePhotos() {

    var entity = {
      'ID': this.multipleid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdateHospital_ClinicPhotos(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else {
        Swal.fire('Mis à jour avec Succés');
      }


      this.GetMultiplePhotos();
      this.mulbit = 0;
    })
  }

  public InsertSubscriptionRevenue() {

    var entity5 = {
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'HospitalClinicID': this.id,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.InsertHospitalClinic_RevenueSubscriptions(entity5).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');
          // this.GetHospitalRevenuesubscriptions();
          this.GetSubscriptionrevenue()
          location.href = "#/HspClidash"
        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succés');
          // this.GetHospitalRevenuesubscriptions();
          this.GetSubscriptionrevenue();
          location.href = "#/HspClidash"
        }
      }
      else {
        Swal.fire('This Contrat Dates Already Exists');
        // this.GetHospitalRevenuesubscriptions();
      }
    })
  }

  public Getsubscriptontype() {

    this.appointmentpercentage = 0
    this.monthlysubription = 0
  }

  revenueupdateid: any;
  subscriptiontypeedit: any;

  public GetContractSubscriptions(subscriptions) {
    this.subscriptiontypeedit = subscriptions.subscriptionTypeID,
      this.monthlysubription = subscriptions.monthlySubscription,
      this.appointmentpercentage = subscriptions.appointmentPercentage,
      this.contractstartdate = subscriptions.editContractStartdate,
      this.contractenddate = subscriptions.editContractEnddate,
      this.revenueupdateid = subscriptions.id
  }



  public updatedetailss() {
    debugger
    var entity = {
      'ID': this.revenueupdateid,
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.UpdateHospitalClinic_RevenueSubscriptions(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
        this.GetSubscriptionrevenue()
      }
      else {
        Swal.fire("Mis à jour avec succés");
        this.GetSubscriptionrevenue()
      }
    }, error => {

    })
  }





  checkVatvalue(even) {

    if (even == 1) {
      this.vatpercentage = 0;
    }
    else {
      this.vatpercentage = 20;
    }
  }


}


