import { z } from "zod";

export const studentApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number must be under 20 characters"),
  collegeOrOrganization: z
    .string()
    .trim()
    .min(2, "College or Organization name is required")
    .max(150, "Name must be under 150 characters"),
  currentStatus: z
    .enum(["Student", "Professional", "Other", "STUDENT", "PROFESSIONAL", "OTHER"], {
      errorMap: () => ({ message: "Please select your current status" }),
    })
    .transform((val) => {
      const lower = val.toLowerCase();
      if (lower === "professional") return "Professional";
      if (lower === "other") return "Other";
      return "Student";
    }),
  courseOrRole: z.string().trim().max(100).optional().nullable().or(z.literal("")),
  yearOrSemester: z.string().trim().max(100).optional().nullable().or(z.literal("")),
});

export type StudentApplicationInput = z.infer<typeof studentApplicationSchema>;
