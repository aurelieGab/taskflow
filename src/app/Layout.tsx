import { NavLink, Outlet } from 'react-router'
export function Layout() {
  return (
    <>
      <header>
        <p>TaskFlow</p>
        <nav>
          <NavLink to="/projects">Projets</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
