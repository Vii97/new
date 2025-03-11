import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    description: z.string().min(3).max(255),
    user_id: z.string()
});

export type Form = z.infer<typeof formSchema>;  