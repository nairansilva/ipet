import { StorageService } from './../../../shared/services/storage-service.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/services/fire-store.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './petForm.component.html',
  styleUrls: ['./petForm.component.css'],
})
export class PetFormComponent {
  petForm: FormGroup;
  uploadPercent: number = 0;
  downloadURL: any = '';
  imgUrl = '../../../../assets/imagens/camera_logo_128x128.png';

  constructor(
    private fb: FormBuilder,
    private petService: FirestoreService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<PetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      birthday: ['', Validators.required],
      photoURL: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const filename = new Date().toTimeString();
      this.uploadPercent = 10;
      this.storageService
        .uploadFile('pets/' + filename, file)
        .subscribe((url) => {
          this.uploadPercent = 50;
          console.log('url aqui', url);
          this.downloadURL = url?.ref.getDownloadURL().then((urlDownload) => {
            this.imgUrl = urlDownload;
            this.uploadPercent = 100;
            this.petForm.patchValue({ photoURL: urlDownload });
          });
        });
    }
  }

  onSave() {
    if (this.petForm.valid) {
      console.log(this.petForm.value);
      this.petService.createDoc('pets', this.petForm.value).then(() => {
        this.dialogRef.close();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  uploadImage() {}

  pictureClick() {
    let teste = new FileReader();
    teste.onloadend = (e) => {
      console.log(teste.result);
    };
  }
}
