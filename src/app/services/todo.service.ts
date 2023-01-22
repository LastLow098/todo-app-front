import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";
import {CreateTodoDto} from "../dto/create-todo.dto";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo,
              private dataQueries: DataQueries) { }


  createTodo(createTodo: CreateTodoDto) {
    return this.apollo.mutate({ mutation: this.dataQueries.createTodo, variables: {"todo" : createTodo}})
  }

  changeCompleted(todoId: number) {
    return this.apollo.mutate({ mutation: this.dataQueries.changeCompleted, variables: {"todoId" : todoId}})
  }
}
