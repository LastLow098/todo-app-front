import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly apollo: Apollo,
              private readonly dataQueries: DataQueries) { }

  getProjects() {
    return this.apollo.watchQuery<any>({ fetchPolicy: 'no-cache', query: this.dataQueries.getProjects, errorPolicy: 'all' }).valueChanges
  }
}

