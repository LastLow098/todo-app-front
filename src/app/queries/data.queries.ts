import {gql} from "apollo-angular";

export class DataQueries {
  getProjects = gql`
  query {
    getProjects {
      id,
      title,
      todos {
        id,
        text,
        isCompleted
      }
    }
  }
  `

  createTodo = gql`
  mutation($project: CreateProjectsInput, $todo: CreateTodosInput!) {
    createTodo(todo: $todo, project: $project) {
      id,
      text,
      isCompleted,
      project{
        id,
        title
      }
    }
  }`

  changeCompleted = gql`
  mutation($todoId: Float!) {
    changeCompleted(TodoId: $todoId)
  }`

  updateTodo = gql`
  mutation($todo:UpdateTodosInput!) {
    updateTodo(updateTodo: $todo) {
      id,
      text,
      isCompleted
    }
  }`
}
