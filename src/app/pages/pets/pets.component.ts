import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from './../../shared/services/fire-store.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PetFormComponent } from './petForm/petForm.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { ScreenService } from '../../shared/services/screen.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
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
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.loadData();
    } else {
      this.frestoreService
        .getFilteredRecords('pets', 'name', filterValue)
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
      this.dataSource.paginator = this.paginator;
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
