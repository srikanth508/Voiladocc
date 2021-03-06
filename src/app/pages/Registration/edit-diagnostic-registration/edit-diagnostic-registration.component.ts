import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-edit-diagnostic-registration',
  templateUrl: './edit-diagnostic-registration.component.html',
  styleUrls: ['./edit-diagnostic-registration.component.css']
})
export class EditDiagnosticRegistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute,private spinner: NgxSpinnerService) { }
  public diagnosticid: any;
  public details: any;
  public diagnosticcentername: any;
  public phno: any;
  public contactperson: any;
  public licenseno: any;
  public licensevalidtill: any;
  public description: any;
  public cityid: any;
  public emailid: any;
  public address: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public citylist: any;
  public photourl: any;
  public contactpersonphno: any;
  public validEmail: any;
  public id: any;
  public photoslist: any;
  public diaphotoid: any;
  public diabit: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public countrylist: any;
  public countryid: any;
  public languageid: any;
  public labels: any;
  dropzonelable: any;
  diagnosticappointmentperslot: any;
  homesampleordersperslot: any;
  homesample: any;
  evngtimings: any;
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
    this.getdiagnosticdetailsforadmin();
    this.GetDiagnosticPhotos();
    this.GetDiagnosticPhotos();
    this.GetCountryMaster()
    this.GetDiagnosticRevenue()
    this.diabit = 0;
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "T??l??charger des fichiers"
    }

    this.countryid = "";
    this.cityid = "";
    this.areaid = "";

  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }
  public getdiagnosticdetailsforadmin() {
    this.docservice.GetDiagnosticDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.details = data[0];
        debugger
        this.diagnosticcentername = this.details.diagnosticCenterName,
          this.phno = this.details.phoneNo,
          this.contactperson = this.details.contactPerson,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.licenseno = this.details.licenseNo,
          this.licensevalidtill = this.details.licenseValidTill,
          this.emailid = this.details.emailID,
          this.address = this.details.address,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipcode,
          this.website = this.details.website,
          this.timings = this.details.timings,
          this.description = this.details.description,
          this.photourl = this.details.photoURL
        this.areaid = this.details.areaID,
          this.countryid = this.details.countryID,
          this.regionID=this.details.regionMasterID
          this.pincode = this.details.pincode,
          this.diagnosticappointmentperslot = this.details.diagnosticAppointmentPerSlot,
          this.homesampleordersperslot = this.details.homeSampleOrdersPerSlot,
          this.homesample = this.details.homeSample,
          this.evngtimings = this.details.eveningTimings,
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

        debugger
        this.GetCountryMaster();
        this.GetRegionMaster()
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

  regionID:any;

  GetRegionID(even)
{
  this.regionID=even.target.value;
  this.getcitymaster()
}


  labels4:any;
  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
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
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }
  public GetcityID(even) {

    this.cityid = even.target.value;
    this.getareamasterbyid();
  }

  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;


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
        Swal.fire("Emplacement r??cup??r?? avec succ??s");
        this.spinner.hide();
      }
      else {
        Swal.fire("Entrez l'adresse correcte");
        this.spinner.hide();
      }

    })
  }

  public updatedetails() {

    var entity = {
      'LanguageID': this.languageid,
      'DiagnosticCenterID': this.id,
      'PhoneNo': this.phno,
      'ContactPerson': this.contactperson,
      'ContactPersonPhNo': this.contactpersonphno,
      'LicenseNo': this.licenseno,
      'LicenseValidTill': this.licensevalidtill,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'Zipcode': this.zipcode,
      'Website': this.website,
      'Timings': this.timings,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'DiagnosticAppointmentPerSlot': this.diagnosticappointmentperslot,
      'HomeSampleOrdersPerSlot': this.homesampleordersperslot,
      'HomeSample': this.homesample,
      'EveningTimings': this.evngtimings,
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
    this.docservice.UpdateDiagnosticCenterProfile(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.getdiagnosticdetailsforadmin();
        Swal.fire(' Updated Successfully');
      }
      else {
        this.getdiagnosticdetailsforadmin();
        Swal.fire('Mis??????jour??avec succ??s');
      }

    })

  }

  public GetDiagnosticPhotos() {

    this.docservice.GetDiagnosticCenterPhotosByID(this.id).subscribe(
      data => {

        this.photoslist = data;
      }, error => {
      }
    )
  }
  public GetDiagphotoId(diaid) {

    this.diaphotoid = diaid;
    this.diabit = 1;
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
    this.docservice.DiagnosticPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }
  public UpdateDiaPhotos() {

    var entity = {
      'ID': this.diaphotoid,
      'PhotoURL': this.attachmentsurl[0],
    }
    this.docservice.UpdateDiagnosticCenterPhotos(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.GetDiagnosticPhotos();
        Swal.fire(' Updated Successfully');
        this.diabit = 0;
        this.showphoto.length = 0
      }
      else {
        this.GetDiagnosticPhotos();
        Swal.fire('Mis??????jour??avec succ??s');
        this.diabit = 0;
        this.showphoto.length = 0
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

  public Diagnosticrevenuelist: any;

  public GetDiagnosticRevenue() {
    this.docservice.GetDiagnosticCentersSubscriptions_Revenue(this.id).subscribe(data => {

      this.Diagnosticrevenuelist = data;
    })
  }






  public monthlysubription: any;
  public contractstartdate: any;
  public contractenddate: any;
  public revenueupdateid: any;



  public GetContractSubscriptions(subscriptions) {
    this.monthlysubription = subscriptions.monthlySubscription;
    this.contractstartdate = subscriptions.editcontractStartDate;
    this.contractenddate = subscriptions.editcontractenddate;
    this.revenueupdateid = subscriptions.id
  }


  public UpdateDiagnosticRevenue() {
    var entity = {
      'ID': this.revenueupdateid,
      'MonthlySubscription': this.monthlysubription,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.UpdateDiagnosticCentersSubscriptions_Revenue(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.GetDiagnosticRevenue();
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis??????jour??avec succ??s');
        this.GetDiagnosticRevenue();
      }

    })

  }


  public addmonthlysubscription: any;
  public contractstartdateeee: any;
  public contractenddateeeee: any;




  public InsertDiagnosticRevenue() {

    var entity = {
      'DiagnosticID': this.id,
      'MonthlySubscription': this.addmonthlysubscription,
      'ContractStartdate': this.contractstartdateeee,
      'ContractEnddate': this.contractenddateeeee
    }
    this.docservice.InsertDiagnosticCentersSubscriptions_Revenue(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Data added Successfully');
        this.GetDiagnosticRevenue();
        this.addmonthlysubscription = "";
        this.contractstartdateeee = "";
        this.contractenddateeeee = "";
      }
      else {
        Swal.fire('Error', 'Contract Dates Already Exists');
        this.GetDiagnosticRevenue();
        this.addmonthlysubscription = "";
        this.contractstartdateeee = "";
        this.contractenddateeeee = "";
      }
    })

  }




}
