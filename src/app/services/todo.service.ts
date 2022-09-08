import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";
import {CreateTodoDto} from "../dto/create-todo.dto";
import {UpdateTodoDto} from "../dto/update-todo.dto";
import {ProjectsDto} from "../dto/projects.dto";
import {firstValueFrom, Observable} from "rxjs";
import {plainToClass} from "class-transformer";
import {TodosDto} from "../dto/todos.dto";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo,
              private dataQueries: DataQueries) { }

  async createTodo(createTodo: CreateTodoDto): Promise<TodosDto> {
    return await firstValueFrom(this.apollo.mutate<any>({ mutation: this.dataQueries.createTodo, variables: {"todo" : createTodo}}))
      .then(response => {
        return plainToClass(TodosDto, response.data.createTodo);
      })
  }

  changeCompleted(todoId: number) {
    return this.apollo.mutate({ mutation: this.dataQueries.changeCompleted, variables: {"todoId" : todoId}})
  }

  updateTodo(updateTodo: UpdateTodoDto) {
    return this.apollo.mutate({ mutation: this.dataQueries.updateTodo, variables: {"todo" : updateTodo}})
  }

  deleteTodo(todoId: number) {

  }
}
