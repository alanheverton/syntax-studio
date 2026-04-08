import { z, ZodError } from 'zod';

// Client validation schemas
export const clientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email'),
});

export const clientUpdateSchema = clientSchema.partial();

// Order validation schemas
export const orderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  contentType: z.string().optional(),
  wordCount: z.number().int().positive().optional(),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email').optional(),
  deadline: z.string().optional(),
});

export const orderUpdateSchema = orderSchema.partial();

// Invoice validation schemas
export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  clientName: z.string().min(1, 'Client name is required'),
  amount: z.string().min(1, 'Amount is required'),
  status: z.enum(['Draft', 'Pending', 'Paid', 'Overdue']).optional(),
  date: z.string().optional(),
});

export const invoiceUpdateSchema = invoiceSchema.partial();

// Timer validation schemas
export const timerSchema = z.object({
  task: z.string().min(1, 'Task is required'),
  project: z.string().optional(),
});

export const timerUpdateSchema = timerSchema.partial();

// Helper function to extract validation errors
export function getZodErrorMessages(error: ZodError): string[] {
  return error.issues.map(issue => {
    const path = issue.path.join('.');
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}