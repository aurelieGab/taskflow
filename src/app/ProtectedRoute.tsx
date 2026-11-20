import { Navigate, Outlet } from 'react-router'
import { useMe } from '../features/auth/hooks/useMe'

export function ProtectedRoute() {
  const me = useMe()
  if (me.isPending) return <p role="status">Chargement...</p>
  if (me.isError) return <p role="alert">Impossible de charger votre profil</p>
  if (!me.data) return <Navigate to="/login" replace />

  return <Outlet />
}
