import { gql } from '@apollo/client';

//Exercise 23 - Unit 21 
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            _id
            username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token 
        user {
            _id
            username
    }
  }
}

`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: ID!) {
    saveBook(bookId: $bookId) {
        user { 
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        user { 
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
}
`;

