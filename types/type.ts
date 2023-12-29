export interface Cars {
  id?: string;
  plate?: string;
  manufacture?: string;
  image?: string;
  model?: string;
  type?: string;
  description?: string;
  transmission?: string;
  capacity?: number;
  rentPerDay?: number;
  availableAt?: Date;
  available?: boolean;
  year?: number;
  options?: string;
  specs?: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  created?: string;
  deleted?: string;
  updated?: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  roles: string;
}

export interface LoginData {
  id: number;
  email: string;
  token: string;
}

export interface ResponseCarPaginate {
  status: number;
  limit: number;
  page: number;
  totalPages: number;
  data: Cars[];
}

export interface ResponseGetUser {
  status: number;
  data: User[];
}

export interface ResponseLogin {
  status: number;
  data: LoginData;
}
