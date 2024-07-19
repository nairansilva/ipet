import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createDoc(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
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
