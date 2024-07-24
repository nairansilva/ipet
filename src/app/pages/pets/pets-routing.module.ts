import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/authGuard';
import { PetsComponent } from './pets.component';

const routes: Routes = [
  { path: '', component: PetsComponent, canActivate: [AuthGuard] },
  // { path: '', component: HomeComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
