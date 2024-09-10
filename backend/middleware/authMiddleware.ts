import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomJwtPayload } from '../express';

// Middleware to verify JWT and attach user info to request
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is sent in "Bearer <token>" format

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as CustomJwtPayload;
        req.user = decoded; // Attach the decoded token payload to req.user
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
};

export default authMiddleware;
