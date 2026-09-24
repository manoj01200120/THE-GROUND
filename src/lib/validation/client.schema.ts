import { z } from "zod";

export const clientInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid work or organization email"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number must be under 20 characters"),
  companyOrOrganization: z
    .string()
    .trim()
    .min(2, "Company or organization name is required")
    .max(150, "Name must be under 150 characters"),
  role: z
    .string()
    .trim()
    .min(2, "Your role / title is required")
    .max(100, "Role must be under 100 characters"),
  problem: z
    .string()
    .trim()
    .min(20, "Please describe the problem or requirement (min 20 characters)")
    .max(3000, "Description must be under 3000 characters"),
  desiredOutcome: z
    .string()
    .trim()
    .min(10, "Please describe your desired outcome or deliverable (min 10 characters)")
    .max(1500, "Deliverable must be under 1500 characters"),
  budget: z
    .string()
    .trim()
    .min(1, "Please select an estimated budget bracket"),
  currency: z
    .enum(["INR", "USD"], {
      errorMap: () => ({ message: "Currency must be INR or USD" }),
    })
    .default("INR"),
  timeline: z
    .string()
    .trim()
    .min(1, "Please select an expected timeline"),
  additionalInformation: z
    .string()
    .trim()
    .max(2000, "Additional information must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

export type ClientInquiryInput = z.infer<typeof clientInquirySchema>;
