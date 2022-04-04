import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit-pharmacy-reg',
  templateUrl: './edit-pharmacy-reg.component.html',
  styleUrls: ['./edit-pharmacy-reg.component.css']
})
export class EditPharmacyRegComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute,private spinner: NgxSpinnerService) { }
  public pharmacyid: any;
  public details: any;
  public pharmacyname: any;
  public contactpersonname: any;
  public licenseno: any;
  public licensevalidtill: any;
  public mobileno: any;
  public email: any;
  public address: any;
  public cityid: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public description: any;
  public citylist: any;
  public photoprofile: any;
  public validEmail: any;
  public photos: any;
  public id: any;
  public photoid: any;
  public pffbit: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public areaid: any;
  public pincode: any;
  public arealist: any;
  public countryid: any;
  public countrylist: any;
  dropzonelable: any;
  pharmacyrevenuelist: any;
  public languageid: any;
  public labels: any;
  date=new Date();
  labels4:any;
  formatAddress: any;
  latitude: any;
  longitude: any;
  googleAddress: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.GetCountryMaster();
    this.getpharmacydetailsforadmin();
    this.GetPhotos();
    this.GetPharmacyRevenue()
    this.pffbit = 0;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.countryid = ""
    this.areaid = "";
    this.cityid = ""
  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }
  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.regionID, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }
  public GetcityID(even) {

    this.cityid = even.target.value;
    this.getareamasterbyid()
  }

  public getlanguage() {
    this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    
    this.docservice.GetAdmin_HospitalClinicRegistration_Lables(this.languageid).subscribe(
      data => {

        this.labels4 = data;
       
      }, error => {
      }
    )
  }



  homedelivery: any;
  nightpharmacy: any;

  public getpharmacydetailsforadmin() {
    this.docservice.GetPhamacyDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.details = data[0];

        this.pharmacyname = this.details.pharmacyName,
          this.contactpersonname = this.details.contactName,
          this.licenseno = this.details.licenseNo,
          this.licensevalidtill = this.details.licenseValidTill,
          this.mobileno = this.details.mobileNumber,
          this.email = this.details.email,
          this.address = this.details.address,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipcode,
          this.website = this.details.website,
          this.timings = this.details.timings,
          this.description = this.details.description,
          this.photoprofile = this.details.photoURL,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.countryid = this.details.countryID,
          this.regionID=this.details.regionMasterID
          this.homedelivery = this.details.homeDelivery,
          this.nightpharmacy = this.details.nightPharmacy,
          this.eveningtimings = this.details.eveningTimings,
          this.taxidentification = this.details.taxIdentification
          this.businessid = this.details.businessID
          this.commercialcity = this.details.commercialRegCity
          this.taxprofessional = this.details.taxProfessional
          this.socialseccurityfundno = this.details.socialSeccurityNo
          this.nameofbank = this.details.nameofthebank
          this.accountName = this.details.accountName
          this.accountNumber = this.details.accountNumber,
          this.latitude=this.details.lattitude,
          this.longitude=this.details.longitude,
          this.formatAddress=this.details.formatedAddress
        this.GetCountryMaster();
        this.getcitymaster();
        this.getareamasterbyid()
        this.GetRegionMaster()
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



  regionID:any;

  GetRegionID(even)
{
  this.regionID=even.target.value;
  this.getcitymaster()
}


  public GetPharmacyRevenue() {
    this.docservice.GetPharmacySubscriptions_Revenue(this.id).subscribe(data => {

      this.pharmacyrevenuelist = data;
    })
  }




  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;
      }, error => {
      }
    )
  }

  eveningtimings: any;
  
  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;
  subscriptiontype: any;

  public GetCountryID(even) {

    this.countryid = even.target.value;
    this.GetRegionMaster()
  }


  public updatedetails() {
    debugger
    var entity = {
      'PharmacyName':this.pharmacyname,
      'LanguageID': this.languageid,
      'PharmacyID': this.id,
      'MobileNumber': this.mobileno,
      'ContactName': this.contactpersonname,
      'LicenseNo': this.licenseno,
      'LicenseValidTill': this.licensevalidtill,
      'Email': this.email,
      'Address': this.address,
      'CityID': this.cityid,
      'Zipcode': this.zipcode,
      'Timings': this.timings,
      'Website': this.website,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.zipcode,
      'CountryID': this.countryid,
      'NightPharmacy': this.nightpharmacy,
      'HomeDelivery': this.homedelivery,
      'EveningTimings': this.eveningtimings,
      'TaxIdentification': this.taxidentification,
      'BusinessID': this.businessid,
      'CommercialRegCity': this.commercialcity,
      'TaxProfessional': this.taxprofessional,
      'SocialSeccurityNo': this.socialseccurityfundno,
      'Nameofthebank': this.nameofbank,
      'AccountName': this.accountName,
      'AccountNumber': this.accountNumber,
      'VAT': 0,
      'Lattitude': this.latitude,
      'Longitude': this.longitude,
      'FormatedAddress': this.formatAddress
    
    }
    this.docservice.UpdatePharmacyProfile(entity).subscribe(res => {
      debugger
      let test = res;
      if(this.languageid==1)
      {
        this.getpharmacydetailsforadmin();
        Swal.fire(' Updated Successfully');
      }
      else{
        this.getpharmacydetailsforadmin();
        Swal.fire('Mise à jour.');
      }
     
    })

  }
  public GetPhotos() {

    this.docservice.GetPharmacyPhotos(this.id).subscribe(
      data => {

        this.photos = data;
      }, error => {
      }
    )

  }
  public GetPharmacyPhotoID(id) {
    this.photoid = id;
    this.pffbit = 1
  }

  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }




  public updatephotos() {

    var entity = {
      'ID': this.photoid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdatePharmacyPhotos(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.getpharmacydetailsforadmin();

        Swal.fire(' Updated Successfully');
        this.GetPhotos();
        this.pffbit = 0;
        this.showphoto.length = 0;
      }
      else {
        this.getpharmacydetailsforadmin();
        Swal.fire('Mis à jour avec succès');
        this.GetPhotos();
        this.pffbit = 0;
        this.showphoto.length = 0;
      }

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


  public monthlysubription: any;
  public contractstartdate: any;
  public contractenddate: any;
  public revenueupdateid: any;



  public GetContractSubscriptions(subscriptions) {
    this.monthlysubription = subscriptions.subscriptionAmount;
    this.contractstartdate = subscriptions.editcontractStartDate;
    this.contractenddate = subscriptions.editcontractenddate;
    this.revenueupdateid = subscriptions.id
  }


  public UpdatePharmacyrevenue() {
    var entity = {
      'ID': this.revenueupdateid,
      'SubscriptionAmount': this.monthlysubription,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.UpdatePharmacySubscriptions_Revenue(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.GetPharmacyRevenue();
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succès');
        this.GetPharmacyRevenue();
      }

    })

  }


  public addmonthlysubscription: any;
  public contractstartdateeee: any;
  public contractenddateeeee: any;


  public InsertPharmacyRevenue() {
    var entity = {
      'PharmacyID': this.id,
      'SubscriptionAmount': this.addmonthlysubscription,
      'ContractStartdate': this.contractstartdateeee,
      'ContractEnddate': this.contractenddateeeee
    }
    this.docservice.InsertPharmacySubscriptions_Revenue(entity).subscribe(data => {

      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Success', 'Data added Successfully');
          this.GetPharmacyRevenue();
          this.addmonthlysubscription = "";
          this.contractstartdateeee = "";
          this.contractenddateeeee = "";
        }
        else {
          Swal.fire('Mis à jour avec succès');
          this.GetPharmacyRevenue();
          this.addmonthlysubscription = "";
          this.contractstartdateeee = "";
          this.contractenddateeeee = "";
        }


      }
      else {
        if (this.languageid == 1)
        {
          Swal.fire('The contract is still valid and has not expired');
        }
        else{
          Swal.fire("Le contrat est toujours valable et n'a pas expiré.");
        }
        
        this.GetPharmacyRevenue();
        this.addmonthlysubscription = "";
        this.contractstartdateeee = "";
        this.contractenddateeeee = "";
      }
    })

  }



  geocode() {
    debugger
    this.spinner.show()
    this.docservice.Getlocation(this.address).subscribe(data => {
      debugger
      console.log("google addressmain", data);
      if (data["results"].length!=0) {
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
}
