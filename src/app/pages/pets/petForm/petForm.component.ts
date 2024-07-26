import { StorageService } from './../../../shared/services/storage-service.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../../../shared/services/fire-store.service';
import { PictureModalComponent } from '../../../shared/components/picture-modal/picture-modal.component';
import Hammer from 'hammerjs'; // Use default import

@Component({
  selector: 'app-pet-form',
  templateUrl: './petForm.component.html',
  styleUrls: ['./petForm.component.css'],
})
export class PetFormComponent implements OnInit, AfterViewInit {
  petForm: FormGroup;
  uploadPercent: number = 0;
  downloadURL: any = '';
  @ViewChild('imageLogo') imageLogo: ElementRef;

  imgUrl = '../../../../assets/imagens/camera_logo_128x128.png';

  constructor(
    private fb: FormBuilder,
    private petService: FirestoreService,
    private storageService: StorageService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.petForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      birthday: ['', Validators.required],
      photoURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.petForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        type: this.data.type,
        birthday: this.data.birthday.toDate(),
        photoURL: this.data.photoURL,
      });
      this.imgUrl = this.data.photoURL;
    }
  }

  ngAfterViewInit() {
    const imageElement = this.imageLogo.nativeElement;
    const hammer = new Hammer(imageElement);

    hammer.on('press', (event) => {
      event.preventDefault();
      const dialogRef = this.dialog.open(PictureModalComponent, {
        width: '500px',
        data: {
          imgUrl: this.imgUrl,
          width: '500px',
          height: '500px',
        },
      });
    });

    // Prevenir o comportamento padrão de toque longo em dispositivos móveis
    imageElement.addEventListener('touchstart', (event: TouchEvent) => {
      event.preventDefault();
    });

    imageElement.addEventListener('touchend', (event: TouchEvent) => {
      event.preventDefault();
    });

    imageElement.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
    });

    // imageElement.addEventListener('touchstart', (event: TouchEvent) => {
    //   console.log('To pressionado');
    //   event.preventDefault();
    //   pressTimer = setTimeout(() => {
    //     const dialogRef = this.dialog.open(PictureModalComponent, {
    //       width: '500px',
    //       data: {
    //         imgUrl: this.imgUrl,
    //         width: '500px',
    //         height: '500px',
    //       },
    //     });
    //   }, 1000); // 1 segundo para considerar como long press
    // });

    // imageElement.addEventListener('touchend', () => {
    //   clearTimeout(pressTimer);
    //   // this.dialog.closeAll();
    // });

    // imageElement.addEventListener('touchmove', () => {
    //   clearTimeout(pressTimer);
    //   console.log('Tirei o click 2');
    // });
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
      if (this.petForm.value['id']) {
        this.petService
          .updateDoc('pets', this.petForm.value['id'], this.petForm.value)
          .then(() => {
            this.dialogRef.close();
          });
      }
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
    teste.onloadend = (e) => {};
  }
}
