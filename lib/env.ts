/**
 * Environment variable validation
 * Run at app startup to fail fast if required variables are missing
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const missing = requiredEnvVars.filter(v => !process.env[v]);

if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
  console.warn(`⚠️  Missing required environment variables: ${missing.join(', ')}`);
  // In production, you might want to throw an error:
  // throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not defined`);
  }
  return value;
}