import { Injectable } from '@angular/core';
import {ProjectsDto} from "../dto/projects.dto";
import {ProjectService} from "./project.service";
import {
  catchError,
  delay,
  firstValueFrom, map, mergeMap,
  Observable, retryWhen, shareReplay, throwError, timer
} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {plainToClass} from "class-transformer";
import {TodoService} from "./todo.service";
import {TodosDto} from "../dto/todos.dto";
import {CreateTodoDto} from "../dto/create-todo.dto";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly projectService: ProjectService,
              private readonly todoService: TodoService,
              private readonly _snackBar: MatSnackBar) { }

  private data: ProjectsDto[] = []
  public isRequestSend: boolean = false
  private isShowMessage: boolean = false

  async getData(): Promise<ProjectsDto[]> {
    if (this.data.length === 0) {
      this.data = plainToClass(ProjectsDto, (await this.request(this.projectService.getProjects())).getProjects as Object[])
    }
    return this.data
  }

  async changeCompleted(todo: TodosDto) {
    todo.isCompleted = (await this.request(this.todoService.changeCompleted(todo.id))).changeCompleted
  }

  async createTodo(createTodo: CreateTodoDto) {
    let project: ProjectsDto = plainToClass(ProjectsDto, (await this.request(this.todoService.createTodo(createTodo))).createTodo)
    let oldProject = this.data.find((elem) => elem.id === project.id)
    if (oldProject) {
      oldProject.todos.push(project.todos[0])
    }else {
      this.data.push(project)
    }
  }

  async request(request: Observable<any>) {
    if (this.isRequestSend) {
      this._snackBar.open('Предыдущая операция еще выполняется');
      this.isShowMessage = true;
      throw 'Предыдущая операция еще выполняется'
    }
    this.isRequestSend = true;
    let timeOut = setTimeout(() => !this.isShowMessage ? this._snackBar.open('Loading...') : null, 500)
    return await firstValueFrom(request.pipe(
      map((res: any) => { return res.data }),
      shareReplay(),
      retryWhen(err => err.pipe( mergeMap((err, i) => i > 1 ? throwError('Ошибка повторного запроса данных') : timer(1000)) ) ),
      catchError(() => { return throwError(() => new Error('Данные не удалось загрузить')) })
    ))
      .then(res => { this._snackBar.dismiss(); return res })
      .catch((err) => { this._snackBar.open(err.message + '\nМы уже чиним проблему', 'close', {panelClass: "action_config"}); return [] })
      .finally(() => { clearTimeout(timeOut); this.isRequestSend = false; this.isShowMessage = false; })
  }
}
