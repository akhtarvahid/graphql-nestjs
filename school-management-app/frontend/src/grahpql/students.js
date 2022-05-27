import { gql } from "@apollo/client";

const usersFragment = gql`
  fragment StudentFragment on Student {
    id
    name
    address
    nationality
}`;

export const CREATE_STUDENT = gql`
mutation createStudent($createStudentInput: CreateStudentInput!) {
    createStudent(createStudentInput: $createStudentInput){
      id,
    name
    contactNo,
    nationality
    }
  }
`

export const STUDENTS = gql`
  query getStudents {
   getStudents {
     ...StudentFragment
   }
 }
  ${usersFragment}
`;
