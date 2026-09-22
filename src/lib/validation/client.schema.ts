import { z } from "zod";

export const clientInquirySchema = z.object({
  name: z.string().min(2, "Contact name must be at least 2 characters"),
  company: z.string().min(2, "Company or organization name is required"),
  email: z.string().email("Please provide a valid company or personal email"),
  phone: z.string().min(8, "Phone number is required"),
  role: z.string().min(2, "Your role / title is required"),
  problem: z.string().min(25, "Please describe the problem or challenge in detail (min 25 characters)"),
  expectedOutcome: z.string().min(15, "Please describe what success or the expected deliverable looks like"),
  budget: z.string().min(1, "Please select an estimated budget bracket"),
  timeline: z.string().min(1, "Please select an expected timeline"),
  additionalInfo: z.string().optional(),
});

export type ClientInquiryInput = z.infer<typeof clientInquirySchema>;
