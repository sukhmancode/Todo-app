import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string; // Ensure this matches what you set in the JWT
}

declare module 'express' {
    export interface Request {
        user?: CustomJwtPayload; // Extend Request interface with user
    }
}
