import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    // provideAnimationsAsync(),
    // provideFirebaseApp(() =>
    //   initializeApp(environment.firebaseConfig )
    // ),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// {
//   projectId: 'ipet-ce14a',
//   appId: '1:463753226419:web:ef100247f67fd0d55de8c6',
//   storageBucket: 'ipet-ce14a.appspot.com',
//   apiKey: 'AIzaSyATyCMspZQoJisRJ06Nu6U7WcLfLPeTmHE',
//   authDomain: 'ipet-ce14a.firebaseapp.com',
//   messagingSenderId: '463753226419',
//   measurementId: 'G-6T8PGTZMMY',
// }
