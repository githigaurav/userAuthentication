import * as yup from 'yup'

export const regValidation = new yup.ObjectSchema({
        name:yup.string().required("Name is required").min(3, "minimum 3 character is required").matches(/^[a-zA-Z]*$/, 'No special character & Number is allowed'),
        email:yup.string().required("Email is required").email("Valid email is required"),
        password:yup.string().required("Password is required").min(4, "Minimum 4 character is required"),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords is not matched')
})