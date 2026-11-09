"use client"
import { registerHandler } from "@/actions/auth.action";
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
import { useRouter } from "next/navigation";

import { Controller, useForm } from 'react-hook-form';

export default function signUpPage() {

    const router = useRouter();
    const { handleSubmit, control, reset } = useForm<registerFormSchema>(
        {
            defaultValues: registerFormDefaultVal,
            resolver: zodResolver(registerSchema),
        }
    );
    async function onSubmit(formValues: registerFormSchema) {

        const { message } = await registerHandler(formValues);
        if (message === "success") {
            toast.add({ type: "success", title: "Account has been created" });
            router.push('/login')
        } else {
            toast.add({ type: "error", title: message })

        }

    }
    return (


        <form id="form-rhf-demo" className='py-5 bg-white w-lg m-auto px-6 my-5 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-xl font-bold pb-5'>Register</h1>
            <FieldGroup>
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="name">
                                Name
                            </FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                id="name"
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your name"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
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
                                placeholder="Create a strong password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="rePassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="rePassword">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                {...field}
                                type="password"
                                id="rePassword"
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirm your password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phoneNumber">
                                Phone Number
                            </FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                id="phoneNumber"
                                aria-invalid={fieldState.invalid}
                                placeholder="+2012345678"
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
                    Submit
                </Button>
                <Button type="button" variant="outline" onClick={() => reset()}>
                    Reset
                </Button>
            </div>
        </form>

    )
}
