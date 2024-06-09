import { JSX } from 'react'
import clsx from 'clsx'
import { Spinner } from '../Spinner'

export type IButtonProps = {
  isBrand?: boolean
  isSmaller?: boolean
  isDanger?: boolean
  isLoading?: boolean
} & JSX.IntrinsicElements['button']

export const Button = ({
  isBrand,
  isSmaller,
  isDanger,
  isLoading,
  children,
  className,
  ...buttonProps
}: IButtonProps) => (
  <button
    className={clsx(
      'flex items-center justify-center text-base text-gray-chateau font-medium font-primary tracking-wide uppercase bg-mischka rounded-sm transition-all duration-250 ease-in-out',
      {
        // this breaks hover:bg-cerise-red but not hover:bg-mountain-meadow-dark TailWind doesn't override correctly
        'hover:bg-ghost': !isDanger,
        'w-[24rem] h-[5.7rem]': !isSmaller, // this breaks if isSmaller is true TailWind doesn't override correctly
        'w-[10rem] h-[3.2rem] text-sm': isSmaller,
        'text-white bg-mountain-meadow hover:bg-mountain-meadow-dark': isBrand,
        'text-white bg-wild-strawberry hover:bg-cerise-red': isDanger,
        // another TailWind override issue
        'cursor-pointer': !buttonProps.disabled,
        'cursor-not-allowed': buttonProps.disabled,
      },
      className
    )}
    {...buttonProps}
  >
    {isLoading ? <Spinner isLight /> : children}
  </button>
)
