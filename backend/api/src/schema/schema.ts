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
    url: z.string({message: 'Url is required'}).url({message: 'Url is required'}),
    newUrl: z.union([z.string(), z.undefined()],{errorMap: () => ({message: 'New url tag must be string or undefined'})}),
    once: z.boolean({message: 'Once must be boolean'}),
    min: z.number({message: "Minute must be number"}).int({message: "Minute must be integer"}).min(0, {message: 'Minute must be between 0 and 7200'}).max(7200, {message: 'Minute must be between 0 and 7200'} ),
})


export const UpdateLinkSchema = z.object({
    url: z.union([z.string(), z.undefined()],{errorMap: () => ({message: 'New url tag must be string or undefined'})}),
    once: z.boolean(),
    min: z.number().int({message: "Minute must be number"}).min(0, {message: 'Minute must be between 0 and 7200'}).max(7200, {message: 'Minute must be between 0 and 7200'} ),
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