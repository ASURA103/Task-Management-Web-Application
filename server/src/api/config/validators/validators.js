import z, { email } from "zod";

//---------------- USER VALIDATORS --------------------

// REGISTER USER
export const registerValidator = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email formate")
    .transform((v) => v.toLowerCase().trim()),
  password: z.string().min(6, " Password must be at least 6 characters"),
});

//LOGIN USER
export const loginValidator = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email formate")
    .transform((v) => v.toLowerCase().trim()),
  password: z.string().min(6, " Password must be at least 6 characters"),
});

// EDIT USER
export const editValidator = z
  .object({
    name: z.string().min(2).max(50).optional(),
    password: z.string().min(6).max(100).optional(),
  })
  .refine((data) => data.name || data.password, {
    message: "At least one field (name or password) is required",
  });

//--------------------- TASK VALIDATORS ----------------------

// CREATE TASK
export const createTaskValidator = z.object({
  title: z.string().min(3).max(120),
  description: z.string().max(800).optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
});

// UPDATE TASK
export const updateTaskValidator = z
  .object({
    title: z.string().min(3).max(120).optional(),
    description: z.string().max(800).optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field required",
  });

// PARAM ID
export const idValidator = z.object({
  id: z.string().min(1),
});

// QUERY (SEARCH / FILTER / SORT / PAGINATION)
export const taskQueryValidator = z.object({
  search: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  sortBy: z.enum(["latest", "oldest", "priority", "dueDate"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
});
