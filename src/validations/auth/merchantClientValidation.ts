import * as Yup from 'yup'
import IUser, {  TSignIn } from '../../types/userTypes/user';
import { ISignUpForm } from '../../types/merchantTypes/merchantClinet/merchantClinet';


const merchantClientSchema: Yup.ObjectSchema<ISignUpForm> =
    Yup.object().shape({
        fullName: Yup.string().required('Please enter your full name'),
        email: Yup.string()
            .required('Please enter your email')
            .email('Invalid email'),
        password: Yup.string().required('Please enter your password'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
        phone: Yup.string().required('Please enter your phone number'),
    })
    export const SignInValidationSchema: Yup.ObjectSchema<TSignIn> =
    Yup.object().shape({
        email: Yup.string()
            .required('Please enter your email')
            .email('Invalid email'),
        password: Yup.string().required('Please enter your password'),
    })


export default merchantClientSchema;
