import { createHash } from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const encryptString = (input: string) : string => {
    const hash = createHash('sha256');
    hash.update(input);
    const encrypted:string = hash.digest('hex');
    return encrypted;
}

const key = process.env.SECRET_KEY;
export const generateToken = (id: string) : string => {
    const payload = {userId: id}
    if(!key){
        throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }
    const token = jwt.sign(payload, key, {expiresIn: '1h'});
    return token;
}

// Middleware for revalidate token
interface DecodedToken extends JwtPayload {
    userId: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    if(!key){
        throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }
    try {
        const decoded = jwt.verify(token, key) as DecodedToken;
        req.body.userId = decoded.userId;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            return res.status(500).json({ message: 'Error verifying token' });
        }
    }
};