import {Exclude, Expose, Type} from "class-transformer";
import {ProjectsDto} from "./projects.dto";
import "reflect-metadata"

export class TodosDto {
  @Expose()
  id: number

  @Expose()
  text?: string

  @Expose()
  isCompleted: boolean

  @Exclude()
  __typename: string

  @Type(() => ProjectsDto)
  project?: ProjectsDto


}
