// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Configuración estándar de Supabase para Middleware
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Obtenemos el usuario de la sesión actual
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 1. Si NO está logueado y quiere entrar a rutas privadas (/profile o /onboarding)
  // Lo pateamos al /login
  if (!user && (pathname.startsWith('/onboarding') || pathname.startsWith('/profile'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. Si SÍ está logueado y quiere entrar al /login
  // Lo pateamos al inicio (no tiene sentido que se vuelva a loguear)
  if (user && pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Cualquier otra ruta (/, /games, /game) pasará de largo y será visible para todos
  return supabaseResponse
}

// Configuración de rutas donde el middleware DEBE ejecutarse
export const config = {
  matcher: [
    /*
     * Ignora las rutas internas de Next.js y archivos estáticos
     * (imágenes, fuentes, css, etc.) para no gastar recursos.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}