import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote: Note;
  deleteNote: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  revokeRefreshTokenForUser: Scalars['Boolean'];
  signup: User;
  updateNote: Note;
};


export type MutationCreateNoteArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRevokeRefreshTokenForUserArgs = {
  userId: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  content: Scalars['String'];
  noteId: Scalars['String'];
  title: Scalars['String'];
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  listNotes: Array<Note>;
  me?: Maybe<User>;
  noteListForCurrentUser: Array<Note>;
};


export type QueryNoteListForCurrentUserArgs = {
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  notes: Note;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type CreateNoteMutationVariables = Exact<{
  content: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote: { __typename?: 'Note', id: string, title: string, content: string, createdAt: any, updatedAt: any } };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote: boolean };

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNotesQuery = { __typename?: 'Query', listNotes: Array<{ __typename?: 'Note', id: string, content: string, title: string, createdAt: any, updatedAt: any, createdBy: { __typename?: 'User', id: string, username: string, email: string } }> };

export type ListNotesForCurrentUserQueryVariables = Exact<{
  orderBy?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ListNotesForCurrentUserQuery = { __typename?: 'Query', noteListForCurrentUser: Array<{ __typename?: 'Note', id: string, content: string, title: string, createdAt: any, updatedAt: any }> };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, user: { __typename?: 'User', email: string, username: string, id: string, createdAt: any, updatedAt: any } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: string, username: string, createdAt: any, updatedAt: any } | null };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', email: string, id: string, username: string, createdAt: any } };

export type EditNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
}>;


export type EditNoteMutation = { __typename?: 'Mutation', updateNote: { __typename?: 'Note', id: string, content: string, title: string, createdAt: any, updatedAt: any, createdBy: { __typename?: 'User', id: string, email: string, username: string } } };


export const CreateNoteDocument = gql`
    mutation createNote($content: String!, $title: String!) {
  createNote(content: $content, title: $title) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
    `;
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      content: // value for 'content'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation deleteNote($noteId: String!) {
  deleteNote(noteId: $noteId)
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const ListNotesDocument = gql`
    query listNotes {
  listNotes {
    id
    content
    title
    createdBy {
      id
      username
      email
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListNotesQuery__
 *
 * To run a query within a React component, call `useListNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListNotesQuery(baseOptions?: Apollo.QueryHookOptions<ListNotesQuery, ListNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNotesQuery, ListNotesQueryVariables>(ListNotesDocument, options);
      }
export function useListNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNotesQuery, ListNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNotesQuery, ListNotesQueryVariables>(ListNotesDocument, options);
        }
export type ListNotesQueryHookResult = ReturnType<typeof useListNotesQuery>;
export type ListNotesLazyQueryHookResult = ReturnType<typeof useListNotesLazyQuery>;
export type ListNotesQueryResult = Apollo.QueryResult<ListNotesQuery, ListNotesQueryVariables>;
export const ListNotesForCurrentUserDocument = gql`
    query listNotesForCurrentUser($orderBy: String, $search: String) {
  noteListForCurrentUser(orderBy: $orderBy, search: $search) {
    id
    content
    title
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListNotesForCurrentUserQuery__
 *
 * To run a query within a React component, call `useListNotesForCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNotesForCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNotesForCurrentUserQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListNotesForCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<ListNotesForCurrentUserQuery, ListNotesForCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNotesForCurrentUserQuery, ListNotesForCurrentUserQueryVariables>(ListNotesForCurrentUserDocument, options);
      }
export function useListNotesForCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNotesForCurrentUserQuery, ListNotesForCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNotesForCurrentUserQuery, ListNotesForCurrentUserQueryVariables>(ListNotesForCurrentUserDocument, options);
        }
export type ListNotesForCurrentUserQueryHookResult = ReturnType<typeof useListNotesForCurrentUserQuery>;
export type ListNotesForCurrentUserLazyQueryHookResult = ReturnType<typeof useListNotesForCurrentUserLazyQuery>;
export type ListNotesForCurrentUserQueryResult = Apollo.QueryResult<ListNotesForCurrentUserQuery, ListNotesForCurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    access_token
    user {
      email
      username
      id
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    email
    id
    username
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation register($password: String!, $email: String!) {
  signup(password: $password, email: $email) {
    email
    id
    username
    createdAt
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const EditNoteDocument = gql`
    mutation editNote($noteId: String!, $content: String!, $title: String!) {
  updateNote(noteId: $noteId, content: $content, title: $title) {
    id
    content
    title
    createdAt
    updatedAt
    createdBy {
      id
      email
      username
    }
  }
}
    `;
export type EditNoteMutationFn = Apollo.MutationFunction<EditNoteMutation, EditNoteMutationVariables>;

/**
 * __useEditNoteMutation__
 *
 * To run a mutation, you first call `useEditNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editNoteMutation, { data, loading, error }] = useEditNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *      content: // value for 'content'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEditNoteMutation(baseOptions?: Apollo.MutationHookOptions<EditNoteMutation, EditNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditNoteMutation, EditNoteMutationVariables>(EditNoteDocument, options);
      }
export type EditNoteMutationHookResult = ReturnType<typeof useEditNoteMutation>;
export type EditNoteMutationResult = Apollo.MutationResult<EditNoteMutation>;
export type EditNoteMutationOptions = Apollo.BaseMutationOptions<EditNoteMutation, EditNoteMutationVariables>;