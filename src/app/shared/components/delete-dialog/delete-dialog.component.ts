import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { FirestoreService } from '../../services/fire-store.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private firestoreService: FirestoreService
  ) {
    console.log('data', this.data);
  }

  delete() {
    this.firestoreService.deleteDoc(this.data.collection, this.data.id).then();
    this.snackBar.open('Registro Deletado com Sucesso', 'X', {
      duration: 2000,
      panelClass: ['success'],
    });
    this.dialogRef.close();
  }

  cancel() {
    this.snackBar.open('Registro Deletado com Sucesso', 'X', {
      duration: 2000,
      panelClass: ['success'],
    });
    this.dialogRef.close();
  }
}
