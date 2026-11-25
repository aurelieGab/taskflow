import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Connexion</h1>
      <LoginForm />
    </div>
  )
}
