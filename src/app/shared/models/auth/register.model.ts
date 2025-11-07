import { ApiStatus } from './common.model';
import { UserRole } from './role.model';

export interface RegisterRequest {
    account: { 
        email: string; 
        password: string; 
        dob: string;
        role: UserRole;
    };
    profile: { 
        firstName: string; 
        lastName: string 
    };
    address: { 
        street: string; 
        streetNumber: string; 
        zip: string
    };
}

export interface RegisterResponse {
    status: ApiStatus;
    token?: string;     // presente solo cuando status === 'success'
}