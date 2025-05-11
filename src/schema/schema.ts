import * as z from 'zod'

export const RegisterSchema = z.object({
    email: z.string().email({message: 'Email is required.'}),
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const number = /[0-9]/.test(val);
            const passwordLength = val.length > 8;

            return lowercase && uppercase && number && passwordLength;
        }, {message: 'Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.'}),
    name: z.string().min(1, { message: 'Name is required' }),
    privacy: z.boolean().refine((val) => {return val}, {message: 'Please accept the privacy policy.'})
})


export const SingInSchema = z.object({
    email: z.string().email({message: 'Email is required.'}),
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const number = /[0-9]/.test(val);
            const passwordLength = val.length > 8;

            return lowercase && uppercase && number && passwordLength;
        }, {message: 'Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.'}),
})