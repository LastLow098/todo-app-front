import {Exclude, Expose} from "class-transformer";

export class TodosDto {
  @Expose()
  id: number

  @Expose()
  text?: string

  @Expose()
  isCompleted: boolean

  @Exclude()
  projectsId: number

  @Exclude()
  __typename: string
}
