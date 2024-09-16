import {
    Request,
    Response,
    NextFunction
} from 'express';
    import Joi, {
    ValidationResult
    } from 'joi'; 

    export const userSchema = Joi.object({
        username: Joi.string().trim().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8),
        fullname: Joi.string().required(),
        type: Joi.number().required(),
    });
    
    export const validateUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        
        // Validate user data
        const result: ValidationResult =
        userSchema.validate(
            req.body,
            { abortEarly: false } // Return all errors
        );
    
        // If errors, return error response
        if (result.error) {
        return res.status(422).json({
            message: 'Invalid request data',
            errors: result.error.details.map(err => err.message),
        });
        }
        // If no errors, continue to next handler
        next();
    };