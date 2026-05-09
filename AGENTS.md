# AGENTS.md - levelzero-front

## Quick Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Project Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4 + Shadcn UI (radix-nova style)
- **Auth/DB**: Supabase (SSR integration)
- **State**: React Query (@tanstack/react-query) + UserContext
- **Icons**: Lucide React

## Important Patterns

### Aliases
Use `@/*` for imports (e.g., `@/components`, `@/lib/utils`, `@/hooks`).

### Supabase Client Pattern
- Server Components / Server Actions: Use `createClient()` from `@/lib/supabase/server`
- Client Components: Use `createBrowserClient()` from `@/lib/supabase/client`

### Middleware Auth
`src/middleware.ts` protects `/profile` and `/onboarding` routes. Unauthenticated users are redirected to `/login`. Logged-in users accessing `/login` are redirected to `/`.

### Image Domains
`next.config.ts` allows images from `images.igdb.com`.

## Route Structure

- `/` - Homepage pública
- `/login` - Login page
- `/onboarding` - User onboarding (protected)
- `/profile` - User profile (protected)
- `/games` - Games list (pública)
- `/game/[id]` - Game detail (pública)
- `/library` - User library (protegida)

## Adding UI Components

New shadcn components via `npx shadcn@latest add [component]`. Components go in `src/components/ui/`.

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

## Common Gotchas

- **No tests configured** - There is no test framework set up
- **Strict TypeScript** - `tsconfig.json` has `strict: true`
- **React Compiler** - Next.js 16 has `reactCompiler: true` enabled in next.config.ts
- **Tailwind 4** - Uses `@tailwindcss/postcss` plugin, not traditional tailwind config