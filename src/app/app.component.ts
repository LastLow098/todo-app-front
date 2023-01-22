import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormComponent} from "./components/form/form.component";
import {DataService} from "./services/data.service";
import {Form, FormControl, FormGroup} from "@angular/forms";
import {ProjectsDto} from "./dto/projects.dto";
import {plainToClass} from "class-transformer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TodosDto} from "./dto/todos.dto";
import {ProjectService} from "./services/project.service";
import {catchError, Observable, of, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public readonly dialog: MatDialog,
    private readonly dataService: DataService,
    private readonly projectService: ProjectService,
    private readonly _snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  title = 'todo-app-front';
  data: ProjectsDto[] = []
  projects$!: Observable<ProjectsDto[]>;

  Form: FormGroup = new FormGroup({
    text: new FormControl(),
    id: new FormControl(),
    title: new FormControl()
  })





  async openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
      data: this.data
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.dataService.createTodo(
    //       result.title ? { "title": result.title } : { "id": Number(result.id) },
    //       { "text": result.text })
    //       .subscribe(
    //         (result: any) => {
    //         this.updateData()
    //         }, error => {
    //           this._snackBar.open("Error", 'close', {panelClass: "action_config"})
    //         })
    //   }
    // });
  }
}
