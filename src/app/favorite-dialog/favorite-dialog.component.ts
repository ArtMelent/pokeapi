import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-favorite-dialog',
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="primary" (click)="onYesClick()">Yes</button>
    </div>
  `
})
export class FavoriteDialogComponent {
  constructor(private dialogRef: MatDialogRef<FavoriteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

onNoClick(): void {
this.dialogRef.close('no');
}

onYesClick(): void {
this.dialogRef.close('yes');
}
}