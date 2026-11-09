import * as z from "zod"
export const shippingInfoFormDefaultVal :shippingInfoFormSchema = {

    city: "",
    details: "",
    phone: "",
    paymentMethod: "cash",

}

export const shippingInfoSchema = z.object(
    {

        city: z.string()
            .min(2, { message: "City should be at least 2 characters " }),
        details: z.string()
            .min(5, { message: "Address should be more detailed " }),
        phone: z.string().
            regex(/^01[0125]\d{8}$/, { message: "please enter valid phone number. ex:01234567890" }),
        paymentMethod: z.enum(["cash", "online"])


    }


)
export type shippingInfoFormSchema = z.infer<typeof shippingInfoSchema>;