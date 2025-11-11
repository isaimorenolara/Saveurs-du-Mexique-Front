import { UserRole } from "./role.model";

export interface User {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    dob?: string; 
    role: UserRole
    address?: { 
        street?: string; 
        streetNumber?: string; 
        zip?: string
    };
    createdAt: string;
    updatedAt: string;
}

export interface UsersPage {
    status: 'success';
    pagination: {
        total: number; page: number; pageSize: number; totalPages: number;
        hasNext: boolean; hasPrev: boolean;
    };
    users: User[];
}