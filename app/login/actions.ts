"use server";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from 'next/headers';

// Rate limiter: 10 attempts per minute per IP
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  }),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
});

async function checkRateLimit() {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
             headersList.get("x-real-ip") ||
             "unknown";

  // Skip rate limiting if Redis is not configured
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return { success: true };
  }

  return await ratelimit.limit(ip);
}

export async function signIn(formData: FormData) {
  // Check rate limit before processing
  const { success } = await checkRateLimit();
  if (!success) {
    return { error: 'Too many attempts. Please try again later.' };
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
     return { error: 'Please submit both an email and password' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Returning error text allows the client component to display it elegantly
  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signUp(formData: FormData) {
  // Check rate limit before processing
  const { success } = await checkRateLimit();
  if (!success) {
    return { error: 'Too many attempts. Please try again later.' };
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
     return { error: 'Please submit both an email and password' }
  }

  const supabase = await createClient()

  // Register the user natively via Supabase Postgres
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
