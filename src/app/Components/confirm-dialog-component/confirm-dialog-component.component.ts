import { Component } from '@angular/core';


import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog-component.component.html',
  styleUrl: './confirm-dialog-component.component.scss'
})
export class ConfirmDialogComponentComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponentComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
