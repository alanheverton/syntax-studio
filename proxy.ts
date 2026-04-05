import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  // Pipes requests through our Supabase Cookie handler ensuring user session validity
  return await updateSession(request)
}

export const config = {
  // Apply middleware routing onto all application paths exclusively ignoring static NextJS assets/images
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
