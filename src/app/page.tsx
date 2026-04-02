'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Función para obtener el usuario actual
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Escuchar cambios en la autenticación (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    // Opcional: recargar la página o redirigir
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse">Cargando LevelZero...</p>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          LevelZero
        </h1>

        {user ? (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 space-y-4">
            <div className="flex flex-col items-center">
              {/* Avatar de Google */}
              {user.user_metadata.avatar_url && (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-full border-2 border-purple-500 mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold">{user.user_metadata.full_name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xl text-gray-300">Tu copiloto y biblioteca de videojuegos</p>
            <button 
              onClick={handleLogin}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all bg-gray-800 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700 border border-gray-600"
            >
              <img 
                src="https://www.svgrepo.com/show/475656/google.svg" 
                className="w-6 h-6 mr-3" 
                alt="Google Logo" 
              />
              Iniciar sesión con Google
            </button>
          </div>
        )}
      </div>
    </main>
  )
}