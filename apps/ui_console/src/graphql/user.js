import { gql } from "@apollo/client";

export const sing_in = gql`
  mutation Mutation($name: String!, $pwd: String!) {
    signIn(name: $name, pwd: $pwd) {
      accessToken
      user {
        id
        name
        role
        profile_picture
      }
    }
  }
`;

export const get_users = gql`
  query Users {
    users {
      id
      name
      profile_picture
      token_version
      active
      role
      created_at
      updated_at
    }
  }
`;

export const get_user_by_Id = gql`
  query get_user_by_Id($where: UserWhereUniqueInput!) {
    user(where: $where) {
      name
      password
      token_version
      active
      role
      created_at
      updated_at
      profile_picture
    }
  }
`;

export const create_user = gql`
  mutation create_user($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      name
    }
  }
`;

export const update_user = gql`
  mutation update_user($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      name
    }
  }
`;

export const delete_user = gql`
  mutation delete_user($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      name
    }
  }
`;

export const upsert_user = gql`
  mutation Mutation($name: String!, $password: String!, $role: UserRole!) {
    upsertAppUser(name: $name, password: $password, role: $role) {
      id
      name
    }
  }
`;
export const insert_user = gql`
  mutation insert_user($name: String!, $password: String!, $role: UserRole!) {
    insertAppUser(name: $name, password: $password, role: $role) {
      id
      name
    }
  }
`;
export const create_app_user = gql`
  mutation CreateAppUser($name: String!, $pwd: String!, $role: Role!) {
    createAppUser(name: $name, pwd: $pwd, role: $role)
  }
`;

export const update_app_user = gql`
  mutation UpdateAppUser($updateAppUserId: String!, $name: String!, $pwd: String!, $role: Role!) {
    updateAppUser(id: $updateAppUserId, name: $name, pwd: $pwd, role: $role)
  }
`;
