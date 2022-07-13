import {Expose, Exclude, Type} from "class-transformer";
import {TodosDto} from "./todos.dto";
import "reflect-metadata"

export class ProjectsDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Exclude()
  __typename: string

  @Expose()
  @Type(() => TodosDto)
  todos: Array<TodosDto>
}
