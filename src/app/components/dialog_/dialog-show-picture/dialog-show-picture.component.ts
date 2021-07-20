import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-dialog-show-picture',
  templateUrl: './dialog-show-picture.component.html',
  styleUrls: ['./dialog-show-picture.component.css']
})
export class DialogShowPictureComponent implements OnInit {


  env: any;
  constructor(public dialogRef: MatDialogRef<DialogShowPictureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {link: any}) { }

  ngOnInit(): void {
    this.env = environment.apiBaseUrl
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
