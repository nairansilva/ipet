import { MatTableDataSource } from '@angular/material/table';
import { FirestoreService } from './../../shared/services/fire-store.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PetFormComponent } from './petForm/petForm.component';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
})
export class PetsComponent implements OnInit {
  displayedColumns: string[] = ['actions', 'id', 'name', 'type', 'birthday'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private frestoreService: FirestoreService,
    public dialog: MatDialog
  ) {}

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
          this.dataSource.data = data;
          console.log(data);
          data.map((dataPet) => {
            dataPet.birthday = dataPet.birthday.toDate().toLocaleDateString();
          });
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  loadData() {
    this.frestoreService.getRecords('pets').subscribe((data) => {
      this.dataSource.data = data;
      console.log(data);
      data.map((dataPet) => {
        dataPet.birthday = dataPet.birthday.toDate().toLocaleDateString();
      });
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(pet?: any): void {
    const dialogRef = this.dialog.open(PetFormComponent, {
      width: '400px',
      data: pet || {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deletePet(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: {
        title: `Deseja Apagar o Pet ${name}?`,
        id: id,
        collection: 'pets',
      },
    });
  }
}
