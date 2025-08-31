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
    name: z.string().min(1, { message: 'Name is required' })
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


export const LinkSchema = z.object({
    url: z.string().url({message: 'Url is required'}),
    eligibility: z.array(z.string())
})

export const NewPassSchema = z.object({
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const number = /[0-9]/.test(val);
            const passwordLength = val.length > 8;

            return lowercase && uppercase && number && passwordLength;
        }, {message: 'Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.'}),
})