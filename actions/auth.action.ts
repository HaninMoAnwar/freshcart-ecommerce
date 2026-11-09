"use server"
import { loginFormSchema } from '@/app/schema/login.schema';
import { registerFormSchema } from './../app/schema/register.schema';
const baseUrl = process.env.BASE_URL;
export async function registerHandler(formValues: registerFormSchema) {

    const response = await fetch(`${baseUrl}/api/v1/auth/signup`
        , {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { "Content-Type": "application/json" }
        });
    const data = await response.json();
    return data;

}
/* export async function loginHandler(formValues: loginFormSchema) {

    const response = await fetch(`${baseUrl}/api/v1/auth/signup`
        , {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: { "Content-Type": "application/json" }
        });
    const data = await response.json();
    return data;

} */