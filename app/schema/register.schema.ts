import * as z from "zod"
export const registerFormDefaultVal = {
    name: "",
    email: "",
    password:"",
    rePassword: "",
    phone: ""
}

export const registerSchema = z.object(
    {
        name: z.string()
            .min(2, { message: "Name should be more than 2 characters" })
            .max(50, { message: "Name shouldn't exceeds 50 characters" }),
        email: z.email(),
        password: z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }),
        rePassword: z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }),
        phone: z.string().
            regex(/^01[0125]\d{8}$/,{message:"please enter valid phone number. ex:01234567890"})
    }

).refine((data) => data.password === data.rePassword, { message: 'Passwords are not matched', path: ["rePassword", "password"] });

export type registerFormSchema = z.infer<typeof registerSchema>;