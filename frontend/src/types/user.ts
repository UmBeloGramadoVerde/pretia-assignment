export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
  

export interface User {
    id:	number
    name:	string
    username:	string
    roles:	ROLE[]
    email:	string
    isAccountDisabled:	boolean
    createdAt:	string
    updatedAt:	string
}

export interface SignInInput {
  password:	string
  username:	string
}
export interface SignUpInput {
  password:	string
  username:	string
  email:	string
  name:	string
}