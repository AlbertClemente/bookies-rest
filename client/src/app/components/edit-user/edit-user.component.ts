import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  providers: [UserService]
})
export class EditUserComponent implements OnInit {
  public user: User;
  public userObject;
  public updateUser;
  public tokenObject;
  public idUser;
  public hash;
  public errorMessage;
  public okMessage;
  public apiURL: string;
  public filesToUpload: Array<File>;

  constructor(private _userService: UserService) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.user = this.idUser;
    this.apiURL = GLOBAL.url;
  }

  ngOnInit() {

  }

  onSubmitEdit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      res => {
        this.userObject = res;
        this.updateUser = this.userObject.user;
        if (!this.updateUser) {
          alert('El usuario no se ha actualizado correctamente.');
        } else {
          if (!this.filesToUpload) {
            this.errorMessage = 'Error al subir el archivo.';
          } else {
            this.makeFileRequest(this.apiURL + 'upload-image-user/' + this.user._id, [], this.filesToUpload)
            .then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('idUser', JSON.stringify(this.user));
                console.log(this.user);
              }
            );
          }
          localStorage.setItem('idUser', JSON.stringify(this.user));
          this.user = this.idUser;
          this.okMessage = 'Tus datos han sido actualizados correctamente.';
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    const token = this.hash;

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let index = 0; index < files.length; index++) {
        formData.append('image', files[index], files[index].name);
      }

      // Petición Ajax para subir los archivos
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
