import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {classToPlain, classToPlainFromExist, plainToClass, plainToClassFromExist} from "class-transformer";
import {ProjectsDto} from "../../dto/projects.dto";
import {TodosDto} from "../../dto/todos.dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, of, tap} from "rxjs";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {

  constructor(public readonly dataService: DataService) { }

  data: ProjectsDto[]

  async ngOnInit() {
    this.data = await this.dataService.getData()
  }

  async checked(elem: TodosDto) {
    await this.dataService.changeCompleted(elem)
  }
}
