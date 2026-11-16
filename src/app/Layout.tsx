import { Link, NavLink, Outlet } from 'react-router'
export function Layout() {
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
      </header>
      <main className="mx-auto max-w-5xl px-6 pt-8">
        <Outlet />
      </main>
    </>
  )
}
