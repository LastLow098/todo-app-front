import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {classToPlain, classToPlainFromExist, plainToClass, plainToClassFromExist} from "class-transformer";
import {ProjectsDto} from "../../dto/projects.dto";
import {TodosDto} from "../../dto/todos.dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {

  constructor(private readonly dataService: DataService, private _snackBar: MatSnackBar) { }

  @Input() set data(val: ProjectsDto[]) {
    this._data = val
  }
  _data: ProjectsDto[] = []
  @Output() updateData = new EventEmitter()

  ngOnInit() {}

  checked(changes: boolean, elem: TodosDto) {
    elem.isCompleted = changes
    this.updateData.emit(elem)
  }
}
