export interface TJwtPayload {
  email: string;
  userId: string;
  role: string;
  exp: number;
}

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export enum UserRole {
  TENANT = "tenant",
  LANDLORD = "landlord",
  ADMIN = "admin",
}


export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UsersResponse {
  users: User[]
  metadata: {
    total: number
    page: number
    limit: number
  }
}