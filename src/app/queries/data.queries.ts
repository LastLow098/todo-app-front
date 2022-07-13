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
        isCompleted,
        projectsId
      }
    }
  }
  `

  createTodo = gql`
  mutation($project: CreateProjectsInput!, $todo: CreateTodosInput!){
    createTodo(project: $project, createTodo: $todo) {
      title,
      todos {
        text
      }
    }
  }
  `

  updateTodo = gql`
  mutation($todo:UpdateTodosInput!){
    updateTodo(updateTodo: $todo) {
      id,
      text,
      isCompleted,
      projectsId
    }
  }
  `
}
