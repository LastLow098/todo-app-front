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
  mutation($todo: CreateTodosInput!) {
    createTodo(todo: $todo) {
      id,
      title,
      todos {
        id,
        text,
        isCompleted
      }
    }
  }`

  changeCompleted = gql`
  mutation($todoId: Float!) {
    changeCompleted(TodoId: $todoId)
  }`
}
