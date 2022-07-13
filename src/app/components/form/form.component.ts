import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectsDto} from "../../dto/projects.dto";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProjectsDto[]) {}


  ngOnInit(): void {
  }

  Form: FormGroup = new FormGroup({
    text: new FormControl(),
    id: new FormControl(),
    title: new FormControl()
  })

  onNoClick() {
    this.dialogRef.close();
  }

}
