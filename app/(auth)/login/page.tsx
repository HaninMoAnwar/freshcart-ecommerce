"use client"
// import { loginHandler } from "@/actions/auth.action";
import { loginFormDefaultVal, loginFormSchema, loginSchema } from "@/app/schema/login.schema";
import { registerFormDefaultVal, registerFormSchema, registerSchema } from "@/app/schema/register.schema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from 'react-hook-form';

export default function LoginPage() {

  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<loginFormSchema>(
    {
      defaultValues: loginFormDefaultVal,
      resolver: zodResolver(loginSchema),
    }
  );
  async function onSubmit(formValues: loginFormSchema) {
    const response = await signIn("credentials", { ...formValues, redirect: false });
   
    if (response?.ok) {
      toast.add({ type: "success", title: "Welcome Back!" });
      router.push('/')
      

    } else {
      toast.add({ type: "error", title: "Incorrect email or password" })

    }

  }
  return (


    <form id="form-rhf-demo" className='py-5 bg-white w-lg m-auto px-6 my-5 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-xl font-bold pb-5'>Login</h1>
      <FieldGroup>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">
                Email
              </FieldLabel>
              <Input
                {...field}
                type="email"
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">
                Password
              </FieldLabel>
              <Input
                {...field}
                type="password"
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

      </FieldGroup>
      <div className="flex justify-start gap-2 py-5">

        <Button type="submit" form="form-rhf-demo">
          Login
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
      </div>
    </form>

  )
}
