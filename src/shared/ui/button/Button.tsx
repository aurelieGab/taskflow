import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../lib/cn'
import { buttonVariants } from './buttonVariants'

type ButtonProps = ComponentPropsWithRef<'button'> & VariantProps<typeof buttonVariants>

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}
