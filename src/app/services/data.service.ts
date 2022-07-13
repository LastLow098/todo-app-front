import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";
import {lastValueFrom} from "rxjs";
import {TodosDto} from "../dto/todos.dto";
import {ProjectsDto} from "../dto/projects.dto";
import {plainToClass} from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo,
              private dataQueries: DataQueries) { }

  getProjects() {
    return this.apollo.watchQuery({ fetchPolicy: 'no-cache', query: this.dataQueries.getProjects }).valueChanges
  }

  updateTodo(variables: TodosDto) {
    return this.apollo.mutate({ mutation: this.dataQueries.updateTodo, variables: {"todo" : variables}})
  }

  createTodo(varProject: any, varTodo: any) {
    return this.apollo.mutate({ mutation: this.dataQueries.createTodo, variables: {"project": varProject,  "todo" : varTodo}})
  }
}
