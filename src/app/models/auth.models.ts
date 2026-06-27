export interface LoginRequest {
  email: string;
  contrasenia: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nombreCompleto: string;
  email: string;
  contrasenia: string;
}

export interface RegisterResponse {
  message: string;
}