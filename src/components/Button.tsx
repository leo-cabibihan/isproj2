// @ts-nocheck
import Link from 'next/link'
import clsx from 'clsx'
 
const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none',
}

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
    green: 'bg-emerald-600 text-white hover:text-slate-100 hover:bg-emerald-500 active:bg-emerald-800 active:text-emerald-100 focus-visible:outline-emerald-600',
    red: 'bg-red-600 text-white hover:text-slate-100 hover:bg-red-500 active:bg-red-800 active:text-red-100 focus-visible:outline-red-600',
    yellow: 'bg-yellow-600 text-white hover:text-slate-100 hover:bg-yellow-500 active:bg-yellow-800 active:text-yellow-100 focus-visible:outline-yellow-600',
  },
  outline: {
    slate: 'ring-slate-400 text-slate-700 hover:text-slate-900 hover:ring-slate-600 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    blue: 'ring-blue-500 text-blue-600 hover:text-blue-700 hover:ring-blue-600 active:bg-blue-100 active:text-blue-400 focus-visible:outline-blue-600 focus-visible:ring-blue-600',
    white: 'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    green: 'ring-emerald-500 text-emerald-600 hover:text-emerald-700 hover:ring-emerald-600 active:bg-emerald-100 active:text-emerald-400 focus-visible:outline-emerald-600 focus-visible:ring-emerald-600',
    red: 'ring-red-500 text-red-600 hover:text-red-700 hover:ring-red-600 active:bg-red-100 active:text-red-400 focus-visible:outline-red-600 focus-visible:ring-red-600',
    yellow: 'ring-yellow-500 text-yellow-600 hover:text-yellow-700 hover:ring-yellow-600 active:bg-yellow-100 active:text-yellow-400 focus-visible:outline-yellow-600 focus-visible:ring-yellow-600',
  },
}

export type VariantKey = keyof typeof variantStyles
export type ColorKey<Variant extends VariantKey> =
  keyof (typeof variantStyles)[Variant]

export type ButtonProps<
  Variant extends VariantKey,
  Color extends ColorKey<Variant>,
> = {
  variant?: Variant
  color?: Color
} & (
  | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
  | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
      href?: undefined
    })
)

export function Button<
  Color extends ColorKey<Variant>,
  Variant extends VariantKey = 'solid',
>({ variant, color, className, ...props }: ButtonProps<Variant, Color>) {
  variant = variant ?? ('solid' as Variant)
  color = color ?? ('slate' as Color)

  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
