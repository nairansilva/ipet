import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDoc(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  getRecords(collection: string): Observable<any[]> {
    return this.firestore
      .collection(collection)
      .valueChanges({ idField: 'id' });
  }

  getFilteredRecords(
    collection: string,
    field: string,
    filter: string
  ): Observable<any[]> {
    return this.firestore
      .collection(collection, (ref) => ref.where(field, '==', filter))
      .valueChanges({ idField: 'id' });
  }

  getDocs(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  updateDoc(collection: string, docId: string, data: any) {
    return this.firestore.collection(collection).doc(docId).update(data);
  }

  deleteDoc(collection: string, docId: string) {
    return this.firestore.collection(collection).doc(docId).delete();
  }
}
