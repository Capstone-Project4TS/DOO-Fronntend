export interface Session {
    exp: number;
    message: string;
    token: string;
    user: User;
}

export interface User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    loginAttempts: number;
}