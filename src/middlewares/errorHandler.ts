// errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'ValidationError') {
    const errors: { [key: string]: string } = {};

    // Handle Yup validation errors
    if (err.inner) {
      err.inner.forEach((validationError: any) => {
        const { path, message } = validationError;
        errors[path] = message;
      });
    }

    // Handle Mongoose validation errors
    if (err.errors) {
      for (let field in err.errors) {
        const error = err.errors[field];
        if (error instanceof mongoose.Error.CastError) {
          const path = error.path;
          const kind = error.kind;
          errors[field] = `${path} must be ${kind}`;
        } else {
          errors[field] = error.message;
        }
      }
    }

    return res.status(422).json({ errors });
  }

  // Handle other generic errors
  res.status(err.status || 500);
  res.json(err.message);
};

export default errorHandler;
