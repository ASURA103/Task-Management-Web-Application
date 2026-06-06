import z, { email } from "zod"

//---------------- USER VALIDATORS --------------------

export const registerValidator = z.object({
    name: z.string().min(1,"Name is required").trim(),
    email: z.string().min(1,"Email is required").email("Invalid email formate").transform((v) => v.tolowerCase().trim()),
    password: z.string().min(6," Password must be at least 6 characters")

})


export const loginValidator = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email formate").transform((v) => v.tolowerCase().trim()),
    password: z.string().min(6," Password must be at least 6 characters")

})


//--------------------- TASK VALIDATORS ----------------------

export const taskValidator = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .trim(),

  description: z
    .string()
    .optional()
    .transform((v) => (v ? v.trim() : "")),

  status: z
    .enum(["pending", "completed"])
    .optional(),
});