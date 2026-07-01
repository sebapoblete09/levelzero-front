# LevelZero — Frontend

> **Proyecto en etapa de práctica / desarrollo.** Este repositorio no representa una versión final ni estable del producto. Actualmente es una aplicación **frontend-only**: el backend propio del proyecto está **pausado/no disponible**, por lo que algunas funcionalidades (autenticación completa, persistencia de datos de usuario, librería, reviews, etc.) pueden no funcionar de extremo a extremo si decides probarlo localmente.

LevelZero es una plataforma social para videojuegos: permite a los usuarios explorar un catálogo de juegos, armar su librería personal, calificar y reseñar títulos, y llevar un seguimiento de lo que están jugando, han jugado o quieren jugar (un enfoque similar a Letterboxd, pero orientado a videojuegos).

Este repositorio contiene **únicamente el frontend** de la aplicación, construido con Next.js.

---

## Tabla de contenidos

- [Estado del proyecto](#-estado-del-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Rutas de la aplicación](#-rutas-de-la-aplicación)
- [Requisitos previos](#-requisitos-previos)
- [Variables de entorno](#-variables-de-entorno)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Scripts disponibles](#-scripts-disponibles)
- [Componentes UI](#-componentes-ui)
- [Notas y limitaciones conocidas](#-notas-y-limitaciones-conocidas)
- [Despliegue](#-despliegue)
- [Roadmap](#-roadmap)

---

## Estado del proyecto

Este es un **proyecto personal de práctica**, desarrollado con fines de aprendizaje y portafolio. Algunas consideraciones importantes:

- **No es la versión final.** La UI, la arquitectura y algunas funcionalidades pueden cambiar sin previo aviso.
- **El backend está pausado.** El proyecto depende de Supabase para autenticación y de una integración con la API de IGDB para el catálogo de juegos, pero actualmente no hay un servicio backend activo y mantenido detrás de todas las funcionalidades. Esto significa que, al clonar y correr el proyecto, partes como login, onboarding, librería de usuario o reviews **podrían no responder correctamente** sin la configuración/infraestructura adecuada.
- **No hay tests automatizados** configurados todavía.
- Si quieres probar el proyecto, lo ideal es revisar el código y la UI estática/pública (home, listado de juegos) antes de esperar un flujo completo de usuario autenticado.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Librería UI | [React 19](https://react.dev/) |
| Lenguaje | TypeScript |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com/) |
| Componentes | [shadcn/ui](https://ui.shadcn.com/) sobre primitivas de [Radix UI](https://www.radix-ui.com/) |
| Auth / Backend as a Service | [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`) |
| Manejo de estado de servidor | [TanStack Query](https://tanstack.com/query) |
| Iconos | [Lucide React](https://lucide.dev/) |
| Catálogo de juegos | [IGDB API](https://api-docs.igdb.com/) (Internet Game Database) |
| Linter | ESLint 9 (config Next.js) |
| Optimizaciones | React Compiler (habilitado en `next.config.ts`) |
| Despliegue | [Vercel](https://vercel.com/) |

---

## Estructura del proyecto

```
levelzero-front/
├── public/                     # Assets estáticos
├── src/
│   ├── actions/                 # Server Actions (games, notes, reviews, user)
│   ├── app/
│   │   ├── (login)/              # Grupo de rutas: login y onboarding
│   │   ├── (main)/                # Grupo de rutas: home, games, library, profile, reviews
│   │   ├── auth/callback/         # Callback de autenticación (Supabase)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── assets/                  # Imágenes propias del proyecto
│   ├── components/
│   │   ├── game/                  # Componentes de ficha/detalle de juego
│   │   ├── home/                  # Secciones de la landing/home
│   │   ├── layout/                 # Navbar, Footer, SearchBar, UserMenu
│   │   ├── onboarding/
│   │   ├── profile/
│   │   ├── ui/                     # Componentes base (shadcn/ui)
│   │   └── userHome/                # Dashboard del usuario autenticado
│   ├── const/                   # Constantes (plataformas, formularios de juegos)
│   ├── hooks/                   # Custom hooks (ej. user-profile)
│   ├── lib/
│   │   ├── supabase/               # Clientes Supabase (server y browser)
│   │   └── utils.ts
│   ├── middleware.ts             # Middleware de protección de rutas
│   ├── providers/                # QueryProvider, UserContext
│   ├── types/                    # Tipos TypeScript del dominio
│   └── utils/                   # Helpers de juegos
├── components.json              # Configuración de shadcn/ui
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Funcionalidades

- **Home pública** con secciones destacadas, hero, pricing e integración con IGDB para mostrar juegos.
- **Listado y detalle de juegos**, incluyendo carrusel de capturas, información, idiomas disponibles y reseñas.
- **Sistema de reviews** asociado a cada juego.
- **Librería personal** del usuario (juegos guardados/jugados).
- **Perfil de usuario** editable, con su propio dashboard (juegos recientes, recomendados, próximos lanzamientos, eventos).
- **Autenticación y onboarding** mediante Supabase, con rutas protegidas vía middleware.
- **Modal para agregar juegos** a la librería, con selección de plataforma y calificación.

---

## Rutas de la aplicación

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Home pública | Público |
| `/login` | Inicio de sesión | Público |
| `/onboarding` | Configuración inicial del usuario | Protegida |
| `/games` | Listado de juegos | Público |
| `/game/[id]` | Detalle de un juego | Público |
| `/library` | Librería personal del usuario | Protegida |
| `/profile` | Perfil del usuario | Protegida |
| `/reviews` | Reseñas | Público |

El middleware (`src/middleware.ts`) redirige a usuarios no autenticados que intenten acceder a `/profile` u `/onboarding` hacia `/login`, y redirige a usuarios ya autenticados que visiten `/login` de vuelta a `/`.

---

## Requisitos previos

- Node.js 18 o superior (recomendado 20+)
- npm, yarn, pnpm o bun
- Una instancia de [Supabase](https://supabase.com/) propia si quieres probar el flujo de autenticación (el backend original del proyecto está pausado)

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_de_supabase
```

> Sin estas variables correctamente configuradas (y sin un proyecto Supabase activo), las funcionalidades de autenticación, onboarding, librería y perfil **no funcionarán**.

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/sebapoblete09/levelzero-front.git
cd levelzero-front

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local   # si existe, o crear manualmente como se indica arriba

# 4. Levantar el servidor de desarrollo
npm run dev
```

Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

> Como el backend está pausado, podrás navegar por las secciones públicas (home, listado de juegos), pero el login y las secciones protegidas dependerán de que configures tu propia instancia de Supabase.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run start` | Inicia el servidor en modo producción |
| `npm run lint` | Ejecuta ESLint |

---

## Componentes UI

El proyecto usa **shadcn/ui** sobre Radix UI. Para añadir nuevos componentes:

```bash
npx shadcn@latest add [componente]
```

Los componentes se agregan en `src/components/ui/`.

---

## Notas y limitaciones conocidas

- **Backend pausado**: no hay un servicio activo garantizando disponibilidad de datos de juegos, reviews o usuarios en tiempo real más allá de lo que cada quien configure por su cuenta.
- **Sin tests**: no hay framework de testing configurado aún.
- **TypeScript estricto**: el proyecto usa `strict: true`, por lo que cualquier contribución debe respetar el tipado.
- **Imágenes externas**: `next.config.ts` solo permite imágenes provenientes de `images.igdb.com`; si se usan otras fuentes de imágenes, hay que añadir el dominio correspondiente.
- Este proyecto se mantiene como **work in progress**: pueden existir features a medio terminar, código experimental o componentes sin pulir.

---

## Despliegue

El proyecto está desplegado (versión demo/práctica) en Vercel:
https://levelzero-front.vercel.app

> Nuevamente: dado que el backend está pausado, partes de la demo desplegada pueden no estar completamente funcionales.

---

## Roadmap

- [ ] Reactivar/estabilizar el backend
- [ ] Agregar suite de tests (unitarios e integración)
- [ ] Mejorar manejo de errores y estados de carga
- [ ] Documentar la API/contratos entre frontend y backend
- [ ] Pulir UI/UX en vistas de perfil y librería
- [ ] Agregar variables de entorno de ejemplo (`.env.example`)

---

## 👤 Autor

Desarrollado por [sebapoblete09](https://github.com/sebapoblete09) como proyecto personal de práctica.
