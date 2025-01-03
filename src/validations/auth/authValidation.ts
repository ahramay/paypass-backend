import * as Yup from 'yup'
import IUser, { ISignUpForm, TSignIn } from '../../types/userTypes/user';

const registrationSchema: Yup.ObjectSchema<ISignUpForm> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Invalid email'),
        password: Yup.string().required('Please enter your password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
        fullName: Yup.string().required('Please enter your full name'),
 
        countryCode: Yup.string().required('Please select a country'),
        phone: Yup.string().required('Please enter your phone number'),
    })
    export const SignInValidationSchema: Yup.ObjectSchema<TSignIn> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Invalid email'),
        password: Yup.string().required('Please enter your password'),
    })


export default registrationSchema;
