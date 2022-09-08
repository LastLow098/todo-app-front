import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";
import {TodosDto} from "../dto/todos.dto";
import {ProjectsDto} from "../dto/projects.dto";
import {ProjectService} from "./project.service";
import {catchError, delayWhen, firstValueFrom, of, retryWhen, shareReplay, take, tap, throwError, timer} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apollo: Apollo,
              private projectService: ProjectService,
              private _snackBar: MatSnackBar) { }

  public data: ProjectsDto[] = []

  async getData(): Promise<ProjectsDto[]> {
    let timeOut = setTimeout(() => this._snackBar.open('Loading...'), 500)

    if (this.data.length === 0) this.data = await firstValueFrom(this.projectService.getProjects())
      .then(res => { return res })
      .catch((err) => { this._snackBar.open(err.message, 'close', {panelClass: "action_config"}); return [] })

    clearTimeout(timeOut)
    return this.data
  }
}
