import * as yup from 'yup'

export const regValidation = new yup.ObjectSchema({
        name:yup.string().required("Name is required").min(3, "minimum 3 character is required").matches(/^[a-zA-Z\s]*$/, 'No special character & Number is allowed'),
        email:yup.string().required("Email is required").email("Valid email is required"),
        password:yup.string().required("Password is required").min(4, "Minimum 4 character is required"),
        confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords is not matched')
})


export const loginValidation = new yup.ObjectSchema({
        email:yup.string().email("Valid Email is required").required("Email is required"),
        password:yup.string().required("Password is required").min(4, "Minimum 4 character is required")
})

export const updateUser = new yup.ObjectSchema({
        email:yup.string().email("Valid Email is required"),
        age:yup.number().typeError("Age must be a number").max(60, "Over age").min(18,"You are not adult"),
        location:yup.string().max(72, "Max 72 Character allowed"),
        experience:yup.number().typeError("Experice must be a number").max(10, "Experice is not acceptable")

})