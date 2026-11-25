import { Link, NavLink, Outlet } from 'react-router'
import { useMe } from '@/features/auth/hooks/useMe'
import { Button, buttonVariants } from '@/shared/ui/button'
import { useLogout } from '@/features/auth/hooks/useLogout'

export function Layout() {
  const me = useMe()
  const logout = useLogout()
  return (
    <>
      <header className="flex items-center justify-between border-b bg-white px-6 py-4">
        <Link to="/" className="font-bold">
          TaskFlow
        </Link>
        <nav className="flex gap-2">
          <NavLink to="/projects" className="current-link:font-bold current-link:text-blue-800">
            Projets
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          {me.data ? (
            <>
              <p>Bonjour, {me.data.name}</p>
              <Button onClick={() => logout.mutate()} variant="secondary" size="sm">
                Se déconnecter
              </Button>
            </>
          ) : (
            <NavLink to="/login" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
              Se connecter
            </NavLink>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 pt-8">
        <Outlet />
      </main>
    </>
  )
}
