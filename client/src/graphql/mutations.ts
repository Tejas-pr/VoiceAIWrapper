import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $organizationSlug: String!
    $name: String!
    $status: String!
    $description: String
  ) {
    createProject(
      organizationSlug: $organizationSlug
      name: $name
      status: $status
      description: $description
    ) {
      project {
        id
        name
        status
        taskCount
        completedTasks
        completionRate
      }
    }
  }
`;
