import { z } from "zod";

export const step1BasicSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  college: z.string().min(2, "College/Institution name is required"),
  course: z.string().min(2, "Degree/Course of study is required"),
  year: z.string().min(1, "Academic year is required"),
  city: z.string().min(2, "City is required"),
});

export const step2AboutSchema = z.object({
  projects: z.string().min(15, "Please describe what you have built or worked on (min 15 characters)"),
  interests: z.string().min(15, "Please describe what you are interested in (min 15 characters)"),
  learningGoals: z.string().min(15, "Please describe what you want to learn (min 15 characters)"),
  whatToBuild: z.string().min(15, "Please share an idea or problem you want to build for (min 15 characters)"),
});

export const step3CapabilitySchema = z.object({
  primarySkill: z.string().min(1, "Please select your primary skill domain"),
  secondarySkills: z.array(z.string()).min(1, "Select at least one secondary skill or area"),
  experienceLevel: z.string().min(1, "Select your current experience level"),
});

export const step4CommitmentSchema = z.object({
  whyJoin: z.string().min(25, "Please share why you want to join THE GROUND (min 25 characters)"),
  availability: z.string().min(1, "Please select your weekly time commitment"),
  projectTypes: z.array(z.string()).min(1, "Select at least one type of project you want to work on"),
});

export const step5FinalSchema = z.object({
  github: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Please provide a valid URL").optional().or(z.literal("")),
  additionalLinks: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to THE GROUND community ethos and honesty principles",
  }),
});

export const fullStudentApplicationSchema = step1BasicSchema
  .merge(step2AboutSchema)
  .merge(step3CapabilitySchema)
  .merge(step4CommitmentSchema)
  .merge(step5FinalSchema);

export type StudentApplicationInput = z.infer<typeof fullStudentApplicationSchema>;
export type Step1BasicInput = z.infer<typeof step1BasicSchema>;
export type Step2AboutInput = z.infer<typeof step2AboutSchema>;
export type Step3CapabilityInput = z.infer<typeof step3CapabilitySchema>;
export type Step4CommitmentInput = z.infer<typeof step4CommitmentSchema>;
export type Step5FinalInput = z.infer<typeof step5FinalSchema>;
