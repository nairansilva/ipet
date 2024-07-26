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
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    provideAnimations(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
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
