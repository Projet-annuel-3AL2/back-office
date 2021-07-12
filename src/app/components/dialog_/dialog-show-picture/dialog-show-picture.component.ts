import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-show-picture',
  templateUrl: './dialog-show-picture.component.html',
  styleUrls: ['./dialog-show-picture.component.css']
})
export class DialogShowPictureComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data: {link: string}
  constructor(public dialogRef: MatDialogRef<DialogShowPictureComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
