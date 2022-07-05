import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-folders-dash',
  templateUrl: './folders-dash.component.html',
  styleUrls: ['./folders-dash.component.css']
})
export class FoldersDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  doctorid: any;
  languageid: any;
  folderlist: any;
  labels: any;
  term: any;
  recpid: any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.recpid = localStorage.getItem('recpid');
    this.GetDoctors_PersonalFolder();
    this.getlanguage()
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  GetDoctors_PersonalFolder() {
    if (this.recpid != undefined || this.recpid != null) {
      this.docservice.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
        this.folderlist = data.filter(x => x.receptionistId == this.recpid);
      }, error => {

      })
    }
    else
    {
      this.docservice.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
        this.folderlist = data;
      }, error => {
  
      })
    }
    
  }

















  public deleteFolder(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Folder!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctors_PersonalFolder(id).subscribe(res => {
            let test = res;
            this.GetDoctors_PersonalFolder()
          })
          Swal.fire(
            'Deleted!',
            'Folder has been deleted.',
            'success'
          )
        }
        else {
          this.GetDoctors_PersonalFolder()
        }
      })
    }
    else if (this.languageid == 6) {
      debugger
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctors_PersonalFolder(id).subscribe(res => {
            let test = res;
            this.GetDoctors_PersonalFolder()

          })
          Swal.fire(
            'Supprimé!',
            'Le dossier a été supprimé',
            'success'
          )
        }
        else {
          this.GetDoctors_PersonalFolder()

        }
      })
    }

  }


}
