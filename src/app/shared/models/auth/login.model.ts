import { ApiStatus } from './common.model';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: ApiStatus;
    token?: string;     // presente solo cuando status === 'success'
}