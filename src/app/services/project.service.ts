import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import {DataQueries} from "../queries/data.queries";
import {
  catchError,
  filter,
  firstValueFrom,
  lastValueFrom,
  map,
  tap,
  throwError,
  Observable,
  shareReplay,
  retryWhen, delayWhen, timer, take, mergeMap
} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProjectsDto} from "../dto/projects.dto";
import {plainToClass} from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly apollo: Apollo,
              private readonly dataQueries: DataQueries,
              private readonly _snackBar: MatSnackBar) { }

  public data: any;

  getProjects(): Observable<ProjectsDto[]> {
      return this.apollo.watchQuery<any>({ fetchPolicy: 'no-cache', query: this.dataQueries.getProjects, errorPolicy: 'all' }).valueChanges.pipe(
        map((res) => {
          return plainToClass(ProjectsDto, res.data.getProjects as Object[])
        }),
        shareReplay(),
        retryWhen(err => err.pipe(
          tap(() => console.log("retrying...")),
          mergeMap((err, i) => i > 1 ? throwError('Error from retry!') : timer(1000))
          )
        ),
        catchError(() => { return throwError(() => new Error('Данные не удалось загрузить')) })
      )
  }




}

