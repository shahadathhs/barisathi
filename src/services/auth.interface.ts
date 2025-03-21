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
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}