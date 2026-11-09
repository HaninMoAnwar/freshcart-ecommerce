import * as z from "zod"
export const loginFormDefaultVal = {

    email: "",
    password: "",

}

export const loginSchema = z.object(
    {

        email: z.email(),
        password: z.string()
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                { message: 'Your password at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character' }),
    }

)
export type loginFormSchema = z.infer<typeof loginSchema>;