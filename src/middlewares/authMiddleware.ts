import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
import User from '../models/User/userModel';

const JWT_SECRET = process.env.JWT_SECRET || ''


interface UserPayload {
  userId: string; // Adjust the type based on your user object
}
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
  export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied. No token provided' });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await User.findById(decoded.userId);
  
      if (!user || user._id.toString() !== decoded.userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
  
      (req as any).user = decoded;
      next();
    } catch (error:any) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  
