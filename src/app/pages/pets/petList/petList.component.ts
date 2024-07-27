import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PetsRoutingModule } from '../pets-routing.module';
import { PetFormComponent } from '../petForm/petForm.component';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';
import { FirestoreService } from '../../../shared/services/fire-store.service';
import { ScreenService } from '../../../shared/services/screen.service';

@Component({
  selector: 'app-petList',
  standalone: true,
  imports: [
    CommonModule,
    PetsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  templateUrl: './petList.component.html',
  styleUrls: ['./petList.component.css'],
})
export class PetListComponent implements OnInit {
  displayedColumns: string[] = [
    'actions',
    'id',
    'name',
    'type',
    'birthdayFormated',
  ];
  dataSource = new MatTableDataSource<any>();
  isMobile = false;

  teste = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filterDefault: any;

  constructor(
    private frestoreService: FirestoreService,
    public dialog: MatDialog,
    private screenService: ScreenService
  ) {
    this.screenService.isHandset$.subscribe((isHandset) => {
      this.isMobile = isHandset;
    });
  }

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter(filter: string = '') {
    if (!filter && !this.filterDefault) {
      this.loadData();
    } else {
      let finalFilter: any = [];
      if (!!this.filterDefault) {
        finalFilter = finalFilter.concat(this.filterDefault);
      }
      if (!!filter) {
        finalFilter = finalFilter.concat({
          field: 'name',
          filter: filter,
          operator: '==',
        });
      }
      this.frestoreService
        .getFilteredRecords('pets', finalFilter)
        .subscribe((data) => {
          data.map((dataPet) => {
            dataPet.birthdayFormated = dataPet.birthday
              .toDate()
              .toLocaleDateString();
          });
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  loadData() {
    this.frestoreService.getRecords('pets').subscribe((data) => {
      data.map((dataPet) => {
        dataPet.birthdayFormated = dataPet.birthday
          .toDate()
          .toLocaleDateString();
      });
      this.dataSource.data = data;
      if (!this.isMobile) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openDialog(pet?: any): void {
    const dialogRef = this.dialog.open(PetFormComponent, {
      width: '400px',
      data: pet || {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deletePet(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: `Deletar Pet`,
        message: `Deseja Apagar o Pet ${name}?`,
        id: id,
        collection: 'pets',
      },
    });
  }

  EditPet(data: any) {
    const dialogRef = this.dialog.open(PetFormComponent, {
      width: '400px',
      data: data || {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
