import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-md outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-800 text-white enabled:hover:bg-blue-900',
        secondary:
          'border border-slate-300 bg-white text-slate-800 enabled:hover:bg-slate-100 enabled:hover:text-slate-900',
      },
      size: {
        md: 'h-11 gap-2 px-4',
        sm: 'h-8 px-3 text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)
