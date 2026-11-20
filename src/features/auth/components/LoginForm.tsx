import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '../schema'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router'
import { Button } from '../../../shared/ui/button'
import { ApiError } from '../../../shared/lib/httpClient'

const inputClassName =
  'w-full rounded-md border border-slate-200 p-2 focus:ring-2 focus:ring-blue-500 outline-hidden aria-[invalid=true]:border-red-500'

export function LoginForm() {
  const navigate = useNavigate()
  const mutation = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginInput) => {
    mutation.mutate(data, {
      onSuccess: () => navigate('/projects'),
    })
  }

  const errorMessage =
    mutation.error instanceof ApiError && mutation.error.status === 401
      ? 'Email ou mot de passe incorrect'
      : 'Connexion impossible pour le moment. Réessayez plus tard.'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6 rounded-lg border border-slate-200 bg-white p-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="loginEmail" className="text-sm font-bold">
          Email
        </label>
        <input
          {...register('email')}
          id="loginEmail"
          type="email"
          autoComplete="email"
          className={inputClassName}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'loginEmail-error' : undefined}
        />
        {errors.email && (
          <p id="loginEmail-error" className="text-sm text-red-700">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="loginPassword" className="text-sm font-bold">
          Mot de passe
        </label>
        <input
          {...register('password')}
          id="loginPassword"
          type="password"
          autoComplete="current-password"
          className={inputClassName}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'loginPassword-error' : undefined}
        />
        {errors.password && (
          <p id="loginPassword-error" className="text-sm text-red-700">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Connexion...' : 'Se connecter'}
      </Button>
      {mutation.isError && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
