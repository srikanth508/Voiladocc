import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-create-folders',
  templateUrl: './create-folders.component.html',
  styleUrls: ['./create-folders.component.css']
})
export class CreateFoldersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute,) { }

  folderName: any;
  doctorid: any;
  languageid: any;
  labels: any;
  id: any;
  showEdit: any;
  recpid: any;
  ngOnInit() {
    this.folderName = localStorage.getItem("patientName");
    this.doctorid = localStorage.getItem('userid');
    this.recpid = localStorage.getItem('recpid');
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id == undefined) {
        this.showEdit = 0;
      }
      else {
        this.showEdit = 1;
        this.GetDoctors_PersonalFolder()
      }
    });


    this.getlanguage();
  }


  GetDoctors_PersonalFolder() {
    this.docservice.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
      var list = data.filter(x => x.id == this.id)
      this.folderName = list[0].folderName
    }, error => {

    })
  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  InsertDetails() {
    var entity = {
      'DoctorID': this.doctorid,
      'FolderName': this.folderName,
      'ReceptionistId': this.recpid == undefined || null ? '0' : this.recpid,
      'patientID': 0
    }
    this.docservice.InsertDoctors_PersonalFolder(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire("Saved Successfully");
          location.href = "#/FoldersDash"
        }
        else {
          Swal.fire("Enregistré avec succès");
          location.href = "#/FoldersDash"
        }

      }
      else {
        Swal.fire("Existe déjà");
        location.href = "#/FoldersDash"
      }
    })
  }


  UpdateDoctors_PersonalFolder() {
    var entity = {
      'ID': this.id,
      'FolderName': this.folderName
    }
    this.docservice.UpdateDoctors_PersonalFolder(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire("updated Successfully");
        location.href = "#/FoldersDash"
      }
      else {
        Swal.fire("Mis à jour avec succés");
        location.href = "#/FoldersDash"
      }


    })
  }
}
