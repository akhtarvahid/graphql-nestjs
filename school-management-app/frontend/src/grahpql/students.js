import { gql } from "@apollo/client";

const usersFragment = gql`
  fragment StudentFragment on Student {
    id
    name
    address
    nationality
}`;

export const STUDENTS = gql`
  query getStudents {
   getStudents {
     ...StudentFragment
   }
 }
  ${usersFragment}
`;