import * as z from 'zod';


export const loginSchema = z.object({
  email: z.string().min(10, {
    message: "position must be at least 10 characters.",
  }),
  password: z.string().min(4, {
    message: "password must be at least 4 characters.",
  }),
 
});


export type LoginType = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  email: z.string().min(5, {
    message: "email must be at least 10 characters.",
  }),
  first_name: z.string().min(2, {
    message: "firstname must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "phone must be at least 10 characters.",
  }),
  password: z.string().min(4, {
    message: "password must be at least 4 characters.",
  }),
});

export type SignupType = z.infer<typeof signUpSchema>;