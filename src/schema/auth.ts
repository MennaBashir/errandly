import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

import { config } from '@/lib/config';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .refine((v) => isValidPhoneNumber(v), 'Enter a valid phone number');

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .regex(emailRegex, 'Enter a valid email');

export const signupSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  phone: phoneSchema,
  acceptTerms: z.boolean().refine((v) => v, 'You must accept the Terms & Privacy Policy'),
});
export type SignupInput = z.infer<typeof signupSchema>;

export const loginPhoneSchema = z.object({ identifier: phoneSchema });
export const loginEmailSchema = z.object({ identifier: emailSchema });
export type LoginInput = z.infer<typeof loginPhoneSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .length(config.otpLength, `Enter the ${config.otpLength}-digit code`)
    .regex(/^\d+$/, 'Code must contain digits only'),
});
export type OtpInput = z.infer<typeof otpSchema>;

export const verifyEmailSchema = otpSchema;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resetPasswordEmailSchema = z.object({ identifier: emailSchema });
export const resetPasswordPhoneSchema = z.object({ identifier: phoneSchema });
export type ResetPasswordInput = z.infer<typeof resetPasswordEmailSchema>;
