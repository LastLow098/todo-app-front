import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from "./components/form/form.component";
import {DataService} from "./services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProjectsDto} from "./dto/projects.dto";
import {plainToClass} from "class-transformer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TodosDto} from "./dto/todos.dto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog, private dataService: DataService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.updateData()
  }

  title = 'todo-app-front';
  data: ProjectsDto[]

  Form: FormGroup = new FormGroup({
    text: new FormControl(),
    id: new FormControl(),
    title: new FormControl()
  })

  updateData() {
    let timeout = setTimeout(() => this._snackBar.open('Loading...'), 500)
    this.dataService.getProjects().subscribe((res: any) => {
      this.data = plainToClass(ProjectsDto, res.data.getProjects as Object[])
      this._snackBar.dismiss()
      clearTimeout(timeout)
    }, error => {
      this._snackBar.open("Error", 'close', {panelClass: "action_config"})
    })
  }

  checkedUpdate(elem: TodosDto) {
    this.dataService.updateTodo(elem).subscribe(() => {
      this.updateData()
    }, error => {
      this._snackBar.open("Error", 'close', {panelClass: "action_config"})
      this.updateData()
    })
  }

  async openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.createTodo(
          result.title ? { "title": result.title } : { "id": Number(result.id) },
          { "text": result.text })
          .subscribe(
            (result: any) => {
            this.updateData()
            }, error => {
              this._snackBar.open("Error", 'close', {panelClass: "action_config"})
            })
      }
    });
  }
}
