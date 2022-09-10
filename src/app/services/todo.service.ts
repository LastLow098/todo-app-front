import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo,
              private dataQueries: DataQueries) { }


  changeCompleted(todoId: number) {
    return this.apollo.mutate({ mutation: this.dataQueries.changeCompleted, variables: {"todoId" : todoId}})
  }
}
