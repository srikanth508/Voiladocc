import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-city-master-dash',
  templateUrl: './city-master-dash.component.html',
  styleUrls: ['./city-master-dash.component.css']
})
export class CityMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  public cityslist: any;
  public term: any;
  public countryid: any;
  public cityid: any;
  public countrylist: any;
  public citylist: any;
  public dummlist: any;
  count: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getcitymasters()
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public getcitymasters() {
    this.docservice.GetAreaMasterByLangID(this.languageid).subscribe(
      data => {

        this.cityslist = data;
        this.dummlist = this.cityslist;
        this.count = this.cityslist.length;
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
    if (even.target.value != 0) {

      this.countryid = even.target.value;

      this.cityslist = this.dummlist.filter(x => x.countryID == this.countryid);
      this.count = this.cityslist.length;

      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getcitymasters()
    }
  }

  public getcity() {

    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
        this.count = this.cityslist.length;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {

      this.cityid = even.target.value;

      this.cityslist = this.dummlist.filter(x => x.cityID == this.cityid)

    }
    else if (even.target.value == 0) {
      this.getcity()
    }
  }
  public DeleteAreaMaster(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This City!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteAreaMaster(id).subscribe(res => {
          let test = res;
          this.getcitymasters()
        })
        Swal.fire(
          'Deleted!',
          'City has been deleted.',
          'success'
        )
      }
      else {
        this.getcitymasters()
      }
    })
  }





  file: File;
  contactdata: any;
  arrayBuffer: any;
  incomingfile(event) {
    debugger
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);

    if (characters == ".xlsx") {

      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.contactdata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);

    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  public Upload_file() {
    debugger
    this.docservice.InsertImportCityMaster(this.contactdata).subscribe(data => {

      if (data != undefined || data != null) {
        Swal.fire("Saved Successfully");

      }
    });
  }
}
