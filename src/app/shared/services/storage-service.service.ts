import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  uploadFile(path: string, file: File) {
    const fileRef = this.storage.ref(path);
    const task = this.storage.upload(path, file);

    return task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL())
    );
  }

  getFileUrl(path: string) {
    return this.storage.ref(path).getDownloadURL();
  }
}
